import { inject, Injectable } from "@angular/core";
import { Oferta } from "../domain/entities/oferta.entity";
import { OfertaRepository } from "../domain/interfaces/oferta.repository";

@Injectable({ providedIn: 'root' })
export class CreateOfertaUseCase {
  constructor(private repo: OfertaRepository) {}

  execute(oferta: Oferta) {
    return this.repo.create(oferta);
  }
}