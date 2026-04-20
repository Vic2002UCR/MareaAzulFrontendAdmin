import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TemporadaRepository } from "../../domain/interfaces/temporada.repository";
import { Temporada } from "../../domain/entities/temporada.entity";

@Injectable()
export class TemporadaRemoteRepository implements TemporadaRepository {

  private apiUrl = "https://localhost:7151/api/Temporada";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Temporada[]> {
    return this.http.get<Temporada[]>(this.apiUrl);
  }

  getById(id: number): Observable<Temporada> {
    return this.http.get<Temporada>(`${this.apiUrl}/${id}`);
  }

  create(data: Temporada): Observable<Temporada> {
    return this.http.post<Temporada>(this.apiUrl, data);
  }

  update(id: number, data: Temporada): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}