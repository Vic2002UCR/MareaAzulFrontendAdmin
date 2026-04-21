import { HabitacionDisponibilidadRepository } from "../domain/interfaces/habitacion-disponibilidad.repository";

export class GetDisponibilidadUseCase {
  constructor(private repo: HabitacionDisponibilidadRepository) {}

  execute(inicio: string, fin: string, tipoId?: number) {
    return this.repo.consultarDisponibilidad(inicio, fin, tipoId);
  }
}