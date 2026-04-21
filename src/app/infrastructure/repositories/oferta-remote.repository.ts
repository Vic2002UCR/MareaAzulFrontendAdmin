import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OfertaRepository } from "../../domain/interfaces/oferta.repository";
import { Oferta } from "../../domain/entities/oferta.entity";

@Injectable()
export class OfertaRemoteRepository implements OfertaRepository {
  private apiUrl = "https://localhost:7151/api/oferta";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.apiUrl);
  }

  getById(id: number): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.apiUrl}/${id}`);
  }

  getActivas(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${this.apiUrl}/activas`);
  }

  create(oferta: Oferta): Observable<void> {
    return this.http.post<void>(this.apiUrl, oferta);
  }

  update(id: number, oferta: Oferta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, oferta);
  }

}
