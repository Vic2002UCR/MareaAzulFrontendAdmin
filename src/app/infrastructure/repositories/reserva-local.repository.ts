import { Observable, of } from "rxjs";
import { Reserva } from "../../domain/entities/reserva.entity";
import { ReservaRepository } from "../../domain/interfaces/reserva.repository";
import { Injectable } from "@angular/core";

@Injectable()
export class ReservaLocalRepository implements ReservaRepository {

  private reserva!: Reserva;

  getReserva(): Observable<Reserva[]> {
    return of([this.reserva]);
  }

  setReserva(reserva: Reserva): void {
    this.reserva = reserva;
  }
}