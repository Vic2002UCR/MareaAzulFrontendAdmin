import { Observable } from 'rxjs';
import { Oferta } from '../entities/oferta.entity';

export abstract class OfertaRepository {
    abstract getOferta(): Observable<Oferta[]>;
    abstract setOferta(oferta:Oferta):void;
}