import { Injectable } from "@angular/core";
import { OfertaRepository } from "../domain/interfaces/oferta.repository";
import { Oferta } from "../domain/entities/oferta.entity";

@Injectable({ providedIn: 'root' })
export class UpdateOfertaUseCase {
  constructor(private repo: OfertaRepository) {}

  execute(id: number, oferta: Oferta) {
    return this.repo.update(id, oferta);
  }
}