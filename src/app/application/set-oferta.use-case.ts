import { inject, Injectable } from "@angular/core";
import { Oferta } from "../domain/entities/oferta.entity";
import { OfertaRepository } from "../domain/interfaces/oferta.repository";

@Injectable({
  providedIn: 'root'
})
export class SetReservaUseCase {
  private readonly OfertaRepository = inject(OfertaRepository);

  execute(oferta: Oferta): void {
    this.OfertaRepository.setOferta(oferta);
  }
}