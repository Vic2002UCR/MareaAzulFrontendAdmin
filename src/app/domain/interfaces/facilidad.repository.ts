import { Observable } from 'rxjs';
import { Facilidad } from '../entities/facilidad.entity';

export abstract class FacilidadRepository {
  abstract getFacilidades(): Observable<Facilidad[]>;
}