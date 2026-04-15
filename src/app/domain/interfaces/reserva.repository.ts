import { Observable } from 'rxjs';
import { Reserva } from '../entities/reserva.entity';

export abstract class ReservaRepository {
  abstract getReserva(): Observable<Reserva[]>;
  abstract setReserva(reserva:Reserva):void;
}