export interface EstadoHoy {
  habitacionId: number;
  tipoHabitacion: string;
  costo: number;
  estado: 'DISPONIBLE' | 'OCUPADA';
}