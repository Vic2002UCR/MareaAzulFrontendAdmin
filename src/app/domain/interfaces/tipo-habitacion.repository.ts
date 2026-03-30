import { Observable } from 'rxjs';
import { TipoHabitacion } from '../entities/tipo-habitacion.entity';

export abstract class TipoHabitacionRepository {
  abstract getTiposHabitacion(): Observable<TipoHabitacion[]>;
}