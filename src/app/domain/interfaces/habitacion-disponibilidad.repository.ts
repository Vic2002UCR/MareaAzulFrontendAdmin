import { Disponibilidad } from '../entities/disponibilidad.entity';

export abstract class HabitacionDisponibilidadRepository {
  abstract consultarDisponibilidad(
    inicio: string,
    fin: string,
    tipoId?: number
  ): Promise<Disponibilidad[]>;
}