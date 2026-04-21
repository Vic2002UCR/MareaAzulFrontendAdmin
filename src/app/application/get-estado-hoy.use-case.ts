import { HabitacionEstadoRepository } from "../domain/interfaces/habitacion-estado.repository";


export class GetEstadoHoyUseCase {
  constructor(private repo: HabitacionEstadoRepository) {}

  execute() {
    return this.repo.obtenerEstadoHoy();
  }
}