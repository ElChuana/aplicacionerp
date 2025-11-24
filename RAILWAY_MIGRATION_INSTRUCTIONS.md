# Instrucciones para aplicar cambios en Railway

## Resumen
Se agregó el campo `document_number` a la tabla `obligations` para almacenar el número de factura/boleta/documento asociado.

## Orden de ejecución (IMPORTANTE: seguir este orden)

### 1. Agregar columna a la tabla obligations
Ejecutar el archivo: `prisma/migrations/add_document_number_to_obligations.sql`

```sql
ALTER TABLE obligations 
ADD COLUMN document_number VARCHAR(100);

COMMENT ON COLUMN obligations.document_number IS 'Número de factura, boleta o documento asociado a la obligación';
```

### 2. Actualizar la vista obligations_summary
Ejecutar el archivo: `prisma/migrations/update_obligations_summary_view.sql`

Este script:
- Elimina la vista existente
- Recrea la vista incluyendo el campo `document_number`
- Actualiza el comentario de la vista

### 3. Verificar cambios
Después de ejecutar ambos scripts, verificar que:
- La columna `document_number` existe en la tabla `obligations`
- La vista `obligations_summary` incluye el campo `document_number`

### 4. Redeploy de la aplicación
Una vez aplicados los cambios en Railway, la aplicación se redespleará automáticamente y:
- El campo aparecerá en el formulario de creación de obligaciones
- Se mostrará en la tabla de obligaciones
- Se incluirá en las exportaciones Excel

## Cambios realizados en el código

### Backend:
- ✅ `prisma/schema.prisma` - Agregado campo `document_number`
- ✅ `pages/api/erp/obligations/index.ts` - Actualizado GET y POST para manejar documentNumber
- ✅ `pages/api/export/movements-obligations.ts` - Agregada columna en exportación

### Frontend:
- ✅ `components/CreateObligationForm.tsx` - Agregado input "N° Factura/Boleta"
- ✅ `components/ObligationsTable.tsx` - Agregada columna "N° Documento"

### Database:
- ✅ `prisma/index+view.sql` - Actualizada definición de vista
- ✅ Scripts de migración creados

## Notas importantes
- El campo es **opcional** (puede ser NULL)
- Máximo 100 caracteres
- Se guarda tal como se ingresa (sin formato especial)
- Visible en tablas, formularios y exportaciones
