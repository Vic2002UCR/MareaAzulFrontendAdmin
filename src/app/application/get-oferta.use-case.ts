import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../domain/entities/oferta.entity';
import { OfertaRepository } from '../domain/interfaces/oferta.repository';

@Injectable({
  providedIn: 'root'
})
export class GetOfertaUseCase {
  private readonly OfertaRepository = inject(OfertaRepository);

  execute(): Observable<Oferta[]> {
    return this.OfertaRepository.getOferta();
  }
}