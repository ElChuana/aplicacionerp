## Contexto rápido

Proyecto: aplicación web Next.js (TypeScript) con Prisma + PostgreSQL, UI con Ant Design y Tailwind.
Código híbrido: contiene `pages/` (rutas API y páginas) y `src/app/` (app-router); la mayoría de la lógica de negocio está en `pages/` y `components/`.

## Principales contratos y puntos de integración

- API server: rutas bajo `pages/api/*` (ej: `pages/api/auth/login.ts`). Devuelve JSON y usa `lib/prisma.ts` para DB.
- Base de datos: Prisma + PostgreSQL. Cliente Prisma exportado por `lib/prisma.ts` (singleton, reutilizado en dev).
- Autenticación: `POST /api/auth/login` — devuelve cookie HttpOnly `token` (JWT). JWT secret: `process.env.JWT_SECRET`.
- Subidas: `public/uploads/obligations/*` contiene cargas de obligacionales.
- IA / Sugerencias: endpoints en `pages/api/bank-movements/*` y `pages/api/bank-movements/suggestions-ia.ts` consumen modelos y `data/suggestion_model.json`.

## Scripts y flujo de desarrollo (comandos importantes)

- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev` (Next dev con Turbopack)
- Build producción: `npm run build` && `npm run start`
- Lint: `npm run lint`
- Prisma (generar cliente / migrar): usar herramientas estándar de Prisma (p. ej. `npx prisma generate`, `npx prisma migrate dev`) — el proyecto ya incluye `prisma/schema.prisma` y SQL en `prisma/`.

Entorno requerido (variables de entorno principales):
- `DATABASE_URL` — cadena PostgreSQL
- `JWT_SECRET` — secreto para firmar tokens
- `OPENAI_API_KEY` u otras claves si trabajas con endpoints IA

## Patrones de código y convenciones útiles para el asistente

- Acceso a DB: importa `prisma` desde `lib/prisma.ts`. Evita crear nuevas instancias de PrismaClient — reutiliza el export.
  Ejemplo: `import prisma from '../../lib/prisma'; await prisma.users.findUnique(...)`
- Notificaciones cliente: usa `lib/fetcher.ts` (fetch + `antd.notification`) para llamadas desde cliente con SWR.
- Formularios UI: componentes reutilizables en `components/` (ej. `LoginForm.tsx`) usan Ant Design y validaciones simples.
- Rutas API: deben validar método (`req.method`) y cuerpo antes de operar, y devolver JSON con códigos HTTP apropiados (ver `pages/api/auth/login.ts`).
- Side-effects al importar: `lib/prisma.ts` ejecuta una sincronización inicial de UF (llama a `syncUfRates`) — tenga cuidado si modifica `lib/prisma.ts` porque se ejecuta en import time.

## Archivos clave para revisar antes de cambiar comportamiento
- `lib/prisma.ts` — cliente Prisma y sincronización UF inicial
- `pages/api/auth/login.ts` — flujo de login (bcrypt, JWT cookie)
- `pages/api/*` — todas las rutas API del servidor
- `components/Layout.tsx`, `pages/_app.tsx` — envoltorio global de UI y estilos (AntD reset + tailwind)
- `prisma/schema.prisma` y `prisma/*.sql` — modelo de datos y scripts sql
- `scripts/` — utilidades (p. ej. `sync-uf.ts`, `train_suggestions_model_openai.ts`)

## Ejemplos concretos para el asistente
- Añadir una nueva ruta API segura: crear `pages/api/foo.ts`, importar `prisma` y usar `req.method` guard. Si necesita autenticar, verificar cookie `token` y validar JWT con `process.env.JWT_SECRET`.
- Interactuar con la UI: seguir el patrón de `LoginForm.tsx` y `pages/login.tsx` — handler hace `fetch('/api/auth/login', {method:'POST',...})` y usa `message` u `notification` para feedback.

## Limitaciones / precauciones detectadas
- Proyecto usa tanto `pages/` como `src/app/`. Prefiere modificar páginas existentes bajo `pages/` para consistencia.
- `lib/prisma.ts` ejecuta trabajo asíncrono en el momento de import; al mover o refactorizar, conserva esa intención o desapéguelo explícitamente.
- No asumas que hay tests automatizados o CI configurado (no encontrados). Añadir tests es posible pero no parte del flujo actual.

Si algo de lo anterior está incompleto o prefieres instrucciones en inglés, dime y lo ajusto; ¿quieres que incorpore ejemplos de env vars (.env.example) o comandos Prisma exactos? 

## Formato
- Todos los numeros que escribas los quiero en formato con separador de miles, por ejemplo: 1.000; 20.000; 1.000.000
- Todas las tablas siempre se tienen que ajustar al ancho de la pantalla del dispositivo donde se visualizan, sin generar scroll horizontal.
- Recuerda siempre usar antd de diseño para todos los componentes visuales
- los numero en las tablas también deben tener separador de miles
- hablar siempre en español
- No poner header ni layout en las nuevas páginas que crees
- Siempre que el rut se escriba con el formato rut con guion y dv, por ejemplo: 12.345.678-9 y se vaya actulizando en tiempo real mientras el usuario escribe