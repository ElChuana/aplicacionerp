-- Migración: Agregar campo document_number a la tabla obligations
-- Fecha: 24 de noviembre de 2025
-- Descripción: Agrega columna para almacenar el número de factura/boleta/documento de la obligación

-- IMPORTANTE: Ejecutar primero en Railway (producción) antes de hacer prisma migrate dev

ALTER TABLE obligations 
ADD COLUMN document_number VARCHAR(100);

-- Comentario para documentación
COMMENT ON COLUMN obligations.document_number IS 'Número de factura, boleta o documento asociado a la obligación';
