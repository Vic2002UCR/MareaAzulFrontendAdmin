import { Injectable, inject } from '@angular/core';
import { OfertaRepository } from '../domain/interfaces/oferta.repository';

@Injectable({ providedIn: 'root' })
export class GetOfertasUseCase {

  private repo = inject(OfertaRepository);

  execute() {
    return this.repo.getAll();
  }
}