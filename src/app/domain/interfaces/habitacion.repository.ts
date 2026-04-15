import { Observable } from 'rxjs';
import { Habitacion } from '../entities/habitacion.entity';
export abstract class HabitacionRepository {
  abstract getHabitacion(): Observable<Habitacion[]>;
}


