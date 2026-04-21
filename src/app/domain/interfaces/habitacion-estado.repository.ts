import { EstadoHoy } from '../entities/estado-hoy.entity';

export abstract class HabitacionEstadoRepository {
  abstract obtenerEstadoHoy(): Promise<EstadoHoy[]>;
}