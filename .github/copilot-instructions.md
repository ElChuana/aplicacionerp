## Contexto rápido

Proyecto: aplicación web Next.js 15 (TypeScript) con Prisma + PostgreSQL, UI con Ant Design 5 y Tailwind CSS 4.
Código híbrido: contiene `pages/` (Pages Router - rutas API y páginas) y `src/app/` (App Router); **la mayoría de la lógica de negocio está en `pages/` y `components/`**.

**Arquitectura principal:**
- Frontend: React 18 + Next.js 15 con Pages Router
- Backend: Next.js API Routes en `pages/api/*`
- Base de datos: PostgreSQL con Prisma ORM 6.7
- UI: Ant Design 5 + Tailwind CSS 4
- Estado: SWR para data fetching y caché
- Autenticación: JWT con cookies HttpOnly

## Principales contratos y puntos de integración

### API Server
- Rutas bajo `pages/api/*` (ej: `pages/api/auth/login.ts`)
- Devuelve JSON con códigos HTTP apropiados (200, 400, 401, 500, etc.)
- Usa `lib/prisma.ts` para acceso a DB (singleton)
- Validación de método HTTP con `req.method` guard
- Estructura típica: validar método → validar body → ejecutar lógica → retornar JSON

### Base de datos
- Prisma + PostgreSQL
- Cliente Prisma exportado por `lib/prisma.ts` (singleton, reutilizado en dev con `global.prisma`)
- Schema principal en `prisma/schema.prisma`
- **Modelos principales:**
  - **ERP:** `companies`, `projects`, `bank_accounts`, `bank_movements`, `obligations`, `providers`, `cost_centers`, `sub_accounts`, `credits`, `dte_documents`, `uf_rates`
  - **CRM:** `clients`, `projects`, `units`, `quotations`, `promises`, `deeds`, `receivables`, `payments`, `payment_plans`
  - **Sistema:** `users`

### Autenticación
- Endpoint: `POST /api/auth/login` 
- Retorna cookie HttpOnly `token` (JWT)
- JWT secret: `process.env.JWT_SECRET`
- Expiración: 1 hora
- Validación: bcrypt para comparar passwords
- **Nota:** No hay middleware global de autenticación actualmente; las rutas protegidas deben verificar el token manualmente

### Archivos y subidas
- `public/uploads/obligations/*` — documentos de obligaciones cargadas
- Procesamiento con `formidable` para multipart/form-data

### IA / Sugerencias
- Endpoints en `pages/api/bank-movements/*` y `pages/api/bank-movements/suggestions-ia.ts`
- Consumen modelos y `data/suggestion_model.json`
- OpenAI API para clasificación inteligente

## Scripts y flujo de desarrollo (comandos importantes)

**Desarrollo diario:**
- `npm install` — Instalar dependencias (incluye `postinstall: prisma generate`)
- `npm run dev` — Servidor de desarrollo con Turbopack (puerto 3000)
- `npm run build` — Build de producción (ejecuta `prisma generate` primero)
- `npm run start` — Ejecutar build de producción
- `npm run lint` — ESLint (bloquea build si hay errores)

**Scripts de base de datos:**
- `npm run sync:uf:full` — Sincronizar valores UF históricos completos
- `npm run sync:uf:daily` — Sincronizar UF del día (cron job)
- `npm run migrate:uf:railway` — Migrar UF a Railway (producción)
- `npm run backfill:uf:2025` — Backfill de UF para 2025

**Prisma:**
- `npx prisma generate` — Regenerar Prisma Client después de cambios en schema
- `npx prisma migrate dev --name <nombre>` — Crear y aplicar migración en desarrollo
- `npx prisma studio` — Abrir Prisma Studio para ver/editar datos
- **IMPORTANTE:** Cambios de schema se deben aplicar primero en Railway (producción)

**Variables de entorno (archivo `.env`):**
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
JWT_SECRET="your_secure_jwt_secret_here"
OPENAI_API_KEY="sk-your-openai-api-key"
CMF_API_KEY="your_cmf_api_key"  # Para sincronizar UF
TELEGRAM_BOT_TOKEN="bot_token"  # Opcional: bot de notificaciones
```

## Patrones de código y convenciones obligatorias

### 1. Acceso a Base de Datos
```typescript
// ✅ CORRECTO: importar el singleton de Prisma
import prisma from '../../lib/prisma';

const user = await prisma.users.findUnique({ where: { id: 1 } });

// ❌ INCORRECTO: NO crear nuevas instancias
const prisma = new PrismaClient(); // NO HACER ESTO
```

**Importante:** `lib/prisma.ts` ejecuta sincronización de UF en import time (side-effect). Si lo modificas, mantén esta funcionalidad.

### 2. Rutas API (Next.js API Routes)
```typescript
// Patrón estándar para API routes
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Validar método HTTP
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. Validar datos del request
  const { campo1, campo2 } = req.body;
  if (!campo1 || !campo2) {
    return res.status(400).json({ message: 'Campos requeridos faltantes' });
  }

  try {
    // 3. Lógica de negocio con Prisma
    const resultado = await prisma.modelo.create({ data: { campo1, campo2 } });
    
    // 4. Retornar JSON con código apropiado
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
```

### 3. Fetching de datos en cliente (SWR)
```typescript
// Usar fetcher estándar del proyecto
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
});

function MiComponente() {
  const { data, error, mutate } = useSWR('/api/endpoint', fetcher);
  
  if (error) return <div>Error al cargar</div>;
  if (!data) return <Spin />;
  
  return <div>{/* renderizar data */}</div>;
}
```

### 4. Notificaciones al usuario
```typescript
import { message, notification } from 'antd';

// Para feedback rápido (toast)
message.success('Operación exitosa');
message.error('Error al procesar');

// Para mensajes más detallados
notification.error({
  message: 'Error de conexión',
  description: 'No se pudo conectar al servidor',
  placement: 'topRight',
});
```

### 5. Formularios con Ant Design
```typescript
import { Form, Input, Button } from 'antd';

function MiFormulario() {
  const [form] = Form.useForm();
  
  const onFinish = async (values: any) => {
    try {
      const res = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      if (!res.ok) throw new Error('Error en el servidor');
      
      message.success('Guardado correctamente');
      form.resetFields();
    } catch (error) {
      message.error('Error al guardar');
    }
  };
  
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="campo" label="Campo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Guardar</Button>
      </Form.Item>
    </Form>
  );
}
```

### 6. Componente RutInput (campo de RUT chileno)
```typescript
import { RutInput } from '../components/RutInput';

// Se formatea automáticamente mientras se escribe: 12.345.678-9
<Form.Item name="rut" label="RUT">
  <RutInput placeholder="12.345.678-9" />
</Form.Item>
```

## Estructura del proyecto y archivos clave

### Rutas principales del código
```
pages/
  ├── api/               # API Routes (backend)
  │   ├── auth/         # Autenticación (login, register)
  │   ├── erp/          # Endpoints ERP (obligations, movements, etc.)
  │   └── crm/          # Endpoints CRM (clients, quotations, etc.)
  ├── erp/              # Páginas del módulo ERP
  │   ├── obligations/  # Gestión de obligaciones
  │   ├── movements/    # Movimientos bancarios
  │   ├── cost-centers/ # Centros de costo
  │   └── credits/      # Créditos
  ├── crm/              # Páginas del módulo CRM
  │   ├── clients/      # Gestión de clientes
  │   ├── projects/     # Proyectos inmobiliarios
  │   └── units.tsx     # Unidades en venta
  ├── login.tsx
  └── register.tsx

components/               # Componentes React reutilizables
  ├── Layout.tsx         # Layout principal con Header
  ├── Header.tsx         # Navegación y menú
  ├── RutInput.tsx       # Input con formato de RUT chileno
  ├── ObligationsTable.tsx
  ├── MovementsTable.tsx
  ├── ClientsTable.tsx
  └── ...

lib/
  ├── prisma.ts          # Cliente Prisma singleton + sync UF
  ├── fetcher.ts         # Fetcher para SWR con notificaciones
  └── uf-sync.ts         # Sincronización valores UF desde API CMF

prisma/
  ├── schema.prisma      # Modelo de datos principal
  └── migrations/        # Migraciones de base de datos

scripts/                  # Scripts de utilidad y mantenimiento
```

### Archivos críticos (revisar antes de modificar)
1. **`lib/prisma.ts`** — Cliente Prisma + sincronización UF automática en import
2. **`pages/_app.tsx`** — Punto de entrada global de la app (incluye Layout)
3. **`components/Layout.tsx`** — Estructura base con Header para todas las páginas
4. **`pages/api/auth/login.ts`** — Flujo completo de autenticación
5. **`prisma/schema.prisma`** — Modelo de datos completo
6. **`lib/fetcher.ts`** — Función estándar de fetching con manejo de errores

## Tareas comunes y cómo ejecutarlas

### Añadir una nueva página
```typescript
// pages/erp/mi-nueva-pagina.tsx
import React from 'react';
import { Typography } from 'antd';

export default function MiNuevaPagina() {
  // NO incluir Layout ni Header - ya están en _app.tsx
  return (
    <div>
      <Typography.Title level={2}>Mi Nueva Página</Typography.Title>
      {/* contenido */}
    </div>
  );
}
```

### Añadir una nueva API route
```typescript
// pages/api/mi-endpoint.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }
  
  try {
    const data = await prisma.modelo.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno' });
  }
}
```

### Añadir autenticación a una ruta protegida
```typescript
import { verify } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar token JWT
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    // decoded contiene userId y email
    
    // Continuar con lógica protegida...
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
```

## Limitaciones y precauciones importantes

### ⚠️ Arquitectura híbrida Pages/App Router
- El proyecto usa **principalmente Pages Router** (`pages/`)
- Existe carpeta `src/app/` pero está subutilizada
- **SIEMPRE crear nuevas páginas en `pages/`**, NO en `src/app/`
- Mantener consistencia con el código existente

### ⚠️ Base de datos (Railway)
- **TODOS los cambios de schema se aplican primero en Railway (producción)**
- No ejecutar migraciones locales que no estén sincronizadas
- Usar scripts del proyecto: `npm run migrate:uf:railway`
- Coordinar cambios de schema con el equipo

### ⚠️ Side-effects en imports
- `lib/prisma.ts` ejecuta código asíncrono al importarse (sync UF)
- Al refactorizar este archivo, mantener funcionalidad de sync UF
- Impacta el tiempo de inicio de la aplicación

### ⚠️ Sin tests automatizados
- No existe suite de tests configurada actualmente
- Probar manualmente todos los cambios
- No asumir que hay CI/CD configurado

### ⚠️ Layout global automático
- `pages/_app.tsx` ya incluye `<Layout>` global
- **NO agregar `<Layout>` o `<Header>` en páginas individuales**
- Las páginas solo deben retornar su contenido específico

Si algo de lo anterior está incompleto o prefieres instrucciones en inglés, dime y lo ajusto; ¿quieres que incorpore ejemplos de env vars (.env.example) o comandos Prisma exactos? 

## Formato
- Todos los numeros que escribas los quiero en formato con separador de miles, por ejemplo: 1.000; 20.000; 1.000.000
- Todas las tablas siempre se tienen que ajustar al ancho de la pantalla del dispositivo donde se visualizan, sin generar scroll horizontal.
- Recuerda siempre usar antd de diseño para todos los componentes visuales
- los numero en las tablas también deben tener separador de miles
- hablar siempre en español
- No poner header ni layout en las nuevas páginas que crees
- Siempre que el rut se escriba con el formato rut con guion y dv, por ejemplo: 12.345.678-9 y se vaya actulizando en tiempo real mientras el usuario escribe
- Los cambios de bases de datos se hacen en railways