import { Observable } from 'rxjs';
import { Facilidad } from '../entities/facilidad.entity';

export abstract class FacilidadRepository {
  abstract getAll(): Observable<Facilidad[]>;
  abstract getById(id: number): Observable<Facilidad>;
  abstract getPublicas(): Observable<Facilidad[]>;
  abstract create(facilidad: Facilidad): Observable<Facilidad>;
  abstract update(id: number, facilidad: Facilidad): Observable<any>;
  abstract delete(id: number): Observable<any>;
}