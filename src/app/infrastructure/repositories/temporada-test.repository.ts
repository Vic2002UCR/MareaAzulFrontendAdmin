import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Temporada } from "../../domain/entities/temporada.entity";
import { TemporadaRepository } from "../../domain/interfaces/temporada.repository";

@Injectable()
export class TemporadaRemoteRepository implements TemporadaRepository {

  getTemporadas(): Observable<Temporada[]> {
    return of([
      {
        id: 1,
        nombre: 'Temporada Alta',
        fechaInicio: new Date('2026-04-10'),
        fechaFin: new Date('2026-04-15'),
        porcentaje: 0.80 
      },
      {
        id: 2,
        nombre: 'Temporada Baja',
        fechaInicio: new Date('2026-05-01'),
        fechaFin: new Date('2026-05-31'),
        porcentaje: 0 
      }
    ]);
  }
}