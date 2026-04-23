import { Observable } from "rxjs";
import { Temporada } from "../entities/temporada.entity";

export abstract class TemporadaRepository {
  abstract getAll(): Observable<Temporada[]>;
  abstract getById(id: number): Observable<Temporada>;
  abstract create(data: Temporada): Observable<Temporada>;
  abstract update(id: number, data: Temporada): Observable<any>;
  abstract delete(id: number): Observable<any>;
}