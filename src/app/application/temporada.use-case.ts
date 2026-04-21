import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Temporada } from "../domain/entities/temporada.entity";
import { TemporadaRepository } from "../domain/interfaces/temporada.repository";

@Injectable({
  providedIn: 'root'
})
export class TemporadaUseCase {

  private readonly repository = inject(TemporadaRepository);

  getAll(): Observable<Temporada[]> {
    return this.repository.getAll();
  }

  getById(id: number): Observable<Temporada> {
    return this.repository.getById(id);
  }

  create(data: Temporada): Observable<Temporada> {
    return this.repository.create(data);
  }

  update(id: number, data: Temporada): Observable<any> {
    return this.repository.update(id, data);
  }

  delete(id: number): Observable<any> {
    return this.repository.delete(id);
  }
}