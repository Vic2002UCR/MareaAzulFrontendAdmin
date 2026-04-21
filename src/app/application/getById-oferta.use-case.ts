import { Injectable } from "@angular/core";
import { OfertaRepository } from "../domain/interfaces/oferta.repository";

@Injectable({ providedIn: 'root' })
export class GetByIdOfertaUseCase {

  constructor(private repo: OfertaRepository) {}

  execute(id: number) {
    return this.repo.getById(id);
  }
}