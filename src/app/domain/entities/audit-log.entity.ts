export interface AuditLog {
  id: number;
  adminId: number;
  adminNombre: string;
  operacion: string;
  fechaHora: string;
  ipAddress: string;
  nombreDispositivo: string;
  detalle: string;
}