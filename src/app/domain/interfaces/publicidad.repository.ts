import { Observable } from 'rxjs';
import { Publicidad } from '../entities/publicidad.entity';

export abstract class PublicidadRepository {
  abstract getAll(): Observable<Publicidad[]>;
  abstract getById(id: number): Observable<Publicidad>;
  abstract getActivas(): Observable<Publicidad[]>;
  abstract create(publicidad: Publicidad): Observable<Publicidad>;
  abstract update(id: number, publicidad: Publicidad): Observable<any>;
  abstract delete(id: number): Observable<any>;
}