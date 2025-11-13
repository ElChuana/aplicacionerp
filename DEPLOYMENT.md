# Guía de Deployment a Railway

## Pasos para desplegar el ERP Inmobiliario en Railway

### 1. Preparación del código
✅ Ya completado:
- Scripts de build actualizados en package.json
- railway.json creado con configuración
- .env.example documentado

### 2. Crear cuenta en Railway
1. Ve a https://railway.app
2. Regístrate con GitHub (recomendado) o email
3. Verifica tu email si es necesario

### 3. Crear nuevo proyecto
1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo" si tu código está en GitHub
   - O selecciona "Empty Project" para configurar manualmente

### 4. Agregar PostgreSQL
1. En el proyecto, click en "+ New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente la base de datos
4. Copia la variable DATABASE_URL que aparece en "Variables"

### 5. Agregar el servicio Next.js
1. Click en "+ New" → "GitHub Repo" (o "Empty Service" si no usas GitHub)
2. Selecciona el repositorio `erp-inmobiliario`
3. Railway detectará automáticamente que es una app Next.js

### 6. Configurar variables de entorno
En el servicio Next.js, ve a "Variables" y agrega:

```
DATABASE_URL=postgresql://... (copiada del servicio PostgreSQL)
JWT_SECRET=tu-secreto-jwt-muy-seguro-cambiar-esto
NODE_ENV=production
```

**Opcionales (solo si usas el bot de Telegram):**
```
OPENAI_API_KEY=sk-...
TELEGRAM_BOT_TOKEN=123456:ABC-...
```

### 7. Migrar la base de datos
Antes del primer deploy, necesitas ejecutar las migraciones:

**Opción A: Desde Railway CLI**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Conectar al proyecto
railway link

# Ejecutar migraciones
railway run npx prisma migrate deploy
```

**Opción B: Desde tu máquina local**
```bash
# Usar el DATABASE_URL de Railway temporalmente
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

**Opción C: Desde el dashboard de Railway**
1. Ve al servicio PostgreSQL
2. Click en "Data" → "Query"
3. Ejecuta los scripts SQL de la carpeta `prisma/`:
   - `prisma/schema.prisma` (estructura)
   - `prisma/insert_uf_rates.sql` (datos UF)
   - Otros scripts si existen

### 8. Importar datos iniciales (si es necesario)
Si quieres migrar los datos de tu base de datos local a Railway:

```bash
# Exportar datos locales
pg_dump -h localhost -U juana -d erpdb --data-only > data.sql

# Importar a Railway (usando el DATABASE_URL de Railway)
psql "postgresql://..." < data.sql
```

### 9. Deploy
1. Railway detectará los cambios automáticamente y hará build
2. Espera a que termine el proceso (puede tomar 5-10 minutos)
3. Una vez completado, Railway te dará una URL pública

### 10. Generar dominio público
1. En el servicio Next.js, ve a "Settings"
2. En "Networking" → "Public Networking"
3. Click en "Generate Domain"
4. Railway te asignará un dominio como: `erp-inmobiliario-production.up.railway.app`

### 11. Verificar deployment
1. Abre la URL generada
2. Prueba el login
3. Verifica que las funcionalidades principales funcionen

### 12. Configurar dominio personalizado (opcional)
Si tienes un dominio propio:
1. En "Settings" → "Networking"
2. Click en "Custom Domain"
3. Agrega tu dominio (ej: `erp.tuempresa.cl`)
4. Railway te dará los registros DNS para configurar

---

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"
- Verifica que el script `postinstall` esté en package.json
- Railway debe ejecutar `prisma generate` automáticamente

### Error: Database connection failed
- Verifica que DATABASE_URL esté correctamente configurada
- Asegúrate de que el servicio PostgreSQL esté corriendo

### Error: Build timeout
- Railway tiene límite de 10 minutos para build
- Si falla, intenta reducir el tamaño de node_modules

### La app se despliega pero no funciona
- Revisa los logs en Railway dashboard
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que las migraciones se hayan ejecutado

---

## Notas importantes

1. **Variables de entorno**: Nunca subas el archivo `.env` al repositorio. Usa siempre el dashboard de Railway.

2. **Base de datos**: Railway PostgreSQL viene con respaldos automáticos, pero es recomendable hacer backups manuales periódicos.

3. **Costos**: Railway ofrece $5 de crédito gratis al mes. Monitorea tu uso en el dashboard.

4. **Logs**: Puedes ver los logs en tiempo real desde el dashboard de Railway.

5. **Redeploys**: Cada push a la rama main (o la que configures) hará un redeploy automático.

---

## Comandos útiles de Railway CLI

```bash
# Ver logs en tiempo real
railway logs

# Ejecutar comandos en el entorno de producción
railway run [comando]

# Ver variables de entorno
railway variables

# Conectar shell a la base de datos
railway connect postgres
```
