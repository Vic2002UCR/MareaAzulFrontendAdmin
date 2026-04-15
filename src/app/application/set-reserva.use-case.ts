import { inject, Injectable } from "@angular/core";
import { Reserva } from "../domain/entities/reserva.entity";
import { ReservaRepository } from "../domain/interfaces/reserva.repository";

@Injectable({
  providedIn: 'root'
})
export class SetReservaUseCase {
  private readonly repository = inject(ReservaRepository);

  execute(reserva: Reserva): void {
    this.repository.setReserva(reserva);
  }
}