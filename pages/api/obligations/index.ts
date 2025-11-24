// Alias de compatibilidad: /api/obligations -> /api/erp/obligations
// Permite que código antiguo que aún llama /api/obligations siga funcionando
export { default } from '../erp/obligations';