import { Observable } from "rxjs";
import { Temporada } from "../entities/temporada.entity";

export abstract class TemporadaRepository {
  abstract getTemporadas(): Observable<Temporada[]>;
}