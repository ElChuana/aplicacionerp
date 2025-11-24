# Kanban de Leads (CRM)

## Objetivo
Gestionar leads en columnas por estado (INGRESADO, LLAMADO, SEGUIMIENTO, NEGOCIANDO, DESCARTADO, CONVERTIDO) con drag & drop.

## Pasos de implementación (Producción primero - Railway)
1. Aplicar migración SQL en Railway:
   - Revisar archivo `prisma/migration_leads.sql`.
   - Ejecutar manualmente en la consola de SQL de Railway o usando el script:
     ```bash
     node scripts/migrate-leads-railway.js
     ```
   - Asegúrate de que `DATABASE_URL` apunte a la base de Railway.
2. Verificar tabla y enum creados:
   ```sql
   \d+ leads
   SELECT * FROM leads LIMIT 1;
   ```
3. Local: actualizar cliente Prisma (si quieres usar operaciones tipadas en lugar de SQL crudo):
   ```bash
   npx prisma generate
   ```
4. Navegar a `/crm/leads` en la aplicación para usar el tablero Kanban.

## Endpoints
- `GET /api/crm/leads?company=ID` → Lista de leads por empresa.
- `POST /api/crm/leads` → Crear lead. Campos: `name` (requerido), `email`, `phone`, `source`, `status`, `notes`, `budgetCLP`, `budgetUF`, `companyId`, `projectId`, `clientId`.
- `PATCH /api/crm/leads/{id}/status` → Cambiar estado del lead.

## Estados disponibles
```
INGRESADO
LLAMADO
SEGUIMIENTO
NEGOCIANDO
DESCARTADO
CONVERTIDO
```

## Convertir a Cliente (futuro)
Implementar endpoint que cree un registro en `clients` y cambie `status` del lead a `CONVERTIDO`.

## Consideraciones
- El tablero usa `react-beautiful-dnd` (deprecated pero suficiente). Posible migración futura a `@dnd-kit`.
- SQL crudo usado temporalmente hasta ejecutar `prisma generate` tras migración.
- Los montos de presupuesto CLP y UF son opcionales; se pueden usar para clasificación comercial.

## Próximos pasos sugeridos
- Filtro por fuente y proyecto.
- Histórico de cambios de estado (`lead_status_history`).
- Botón “Convertir Lead” en la tarjeta.
- Integración con notificaciones (Telegram / email) para nuevos leads.
