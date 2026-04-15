import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reserva } from '../../domain/entities/reserva.entity';


@Injectable({
  providedIn: 'root'
})
export class ReservaTestRepository {

  private reservas: Reserva[] = [];

  getReservas(): Observable<Reserva[]> {
    return of(this.reservas).pipe(delay(500));
  }

  saveReserva(reserva: Reserva): Observable<any> {

    const idGenerado = Math.floor(Math.random() * 10000);

    const nuevaReserva: Reserva = {
      ...reserva,
      idReserva: idGenerado
    };

    this.reservas.push(nuevaReserva);

    console.log("Fake backend guardó:", nuevaReserva);

    return of({
      success: true,
      mensaje: `Reserva #${idGenerado} confirmada`,
      reserva: nuevaReserva
    }).pipe(delay(1000)); 
  }
}