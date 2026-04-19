import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicidadRepository } from '../../domain/interfaces/publicidad.repository';
import { Publicidad } from '../../domain/entities/publicidad.entity';

@Injectable()
export class PublicidadRemoteRepository implements PublicidadRepository {
    private apiUrl = 'https://localhost:7151/api/Publicidad';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Publicidad[]> {
        return this.http.get<Publicidad[]>(this.apiUrl);
    }

    getById(id: number): Observable<Publicidad> {
        return this.http.get<Publicidad>(`${this.apiUrl}/${id}`);
    }

    getActivas(): Observable<Publicidad[]> {
        return this.http.get<Publicidad[]>(`${this.apiUrl}/activas`);
    }

    create(publicidad: Publicidad): Observable<Publicidad> {
        return this.http.post<Publicidad>(this.apiUrl, publicidad);
    }

    update(id: number, publicidad: Publicidad): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, publicidad);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}