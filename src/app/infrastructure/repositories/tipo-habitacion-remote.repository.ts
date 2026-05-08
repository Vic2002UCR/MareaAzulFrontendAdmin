import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoHabitacionRepository, ActualizarTipoHabitacionRequest } from '../../domain/interfaces/tipo-habitacion.repository';
import { TipoHabitacion } from '../../domain/entities/tipo-habitacion.entity';
import { environment } from '../../../environments/environment';

@Injectable()
export class TipoHabitacionRemoteRepository implements TipoHabitacionRepository {
  private apiUrl = `${environment.apiUrl}/Habitacion`;

  constructor(private http: HttpClient) {}

  private mapTipo(item: any): TipoHabitacion {
    return {
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      capacidad: item.capacidad,
      tarifa: item.tarifa,
      imgUrl: item.imageUrl   // backend devuelve imageUrl, entidad usa imgUrl
    };
  }

  getTiposHabitacion(): Observable<TipoHabitacion[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos`).pipe(
      map(items => items.map(i => this.mapTipo(i)))
    );
  }

  getById(id: number): Observable<TipoHabitacion> {
    return this.http.get<any>(`${this.apiUrl}/tipos/${id}`).pipe(
      map(item => this.mapTipo(item))
    );
  }

  update(id: number, data: ActualizarTipoHabitacionRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/tipos/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tipos/${id}`);
  }
}
