import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacilidadRepository } from '../../domain/interfaces/facilidad.repository';
import { Facilidad } from '../../domain/entities/facilidad.entity';
import { environment } from '../../../environments/environment';

@Injectable()
export class FacilidadRemoteRepository implements FacilidadRepository {
  private apiUrl = `${environment.apiUrl}/Facilidades`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Facilidad[]> {
    return this.http.get<Facilidad[]>(this.apiUrl);
  }

  getById(id: number): Observable<Facilidad> {
    return this.http.get<Facilidad>(`${this.apiUrl}/${id}`);
  }

  getPublicas(): Observable<Facilidad[]> {
    return this.http.get<Facilidad[]>(`${this.apiUrl}/publicas`);
  }

  create(facilidad: Facilidad): Observable<Facilidad> {
    return this.http.post<Facilidad>(this.apiUrl, facilidad);
  }

  update(id: number, facilidad: Facilidad): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, facilidad);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}