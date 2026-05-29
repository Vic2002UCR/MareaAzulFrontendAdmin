export interface DashboardMetrics {
  meses: string[];
  ingresosMensuales: number[];

  habitacionesOcupadas: number;
  habitacionesDisponibles: number;

  totalRecaudadoHistorico: number;
  totalReservasRealizadas: number;

  reservasConfirmadas: number;
  reservasPendientes: number;
  reservasCanceladas: number;
}