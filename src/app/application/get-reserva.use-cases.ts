import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ReservaRepository } from "../domain/interfaces/reserva.repository";
import { Reserva } from "../domain/entities/reserva.entity";
@Injectable({
  providedIn: 'root'
})
export class GetReservaUseCase {
  private readonly repository = inject(ReservaRepository);

  execute(): Observable<Reserva[]> {
    return this.repository.getReserva();
  }
}