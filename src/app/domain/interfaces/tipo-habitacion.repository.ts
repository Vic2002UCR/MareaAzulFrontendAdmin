import { Observable } from 'rxjs';
import { TipoHabitacion } from '../entities/tipo-habitacion.entity';

export interface ActualizarTipoHabitacionRequest {
  nombre: string;
  descripcion: string;
  capacidad: number;
  tarifa: number;
  imageUrl: string;
}

export abstract class TipoHabitacionRepository {
  abstract getTiposHabitacion(): Observable<TipoHabitacion[]>;
  abstract getById(id: number): Observable<TipoHabitacion>;
  abstract update(id: number, data: ActualizarTipoHabitacionRequest): Observable<void>;
  abstract delete(id: number): Observable<void>;
}
