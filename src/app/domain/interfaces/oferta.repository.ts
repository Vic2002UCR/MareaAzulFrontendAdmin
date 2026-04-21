import { Observable } from 'rxjs';
import { Oferta } from '../entities/oferta.entity';

export abstract class OfertaRepository {

  abstract getAll(): Observable<Oferta[]>;

  abstract getById(id: number): Observable<Oferta>;

  abstract getActivas(): Observable<Oferta[]>;

  abstract create(oferta: Oferta): Observable<void>;

  abstract update(id: number, oferta: Oferta): Observable<void>;

}