import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitacionAdminRepository, HabitacionAdmin } from '../../domain/interfaces/habitacion-admin.repository';
import { environment } from '../../../environments/environment';
import { ResumenHabitacion } from '../../domain/entities/resumen-habitacion.entity';

@Injectable()
export class HabitacionAdminRemoteRepository implements HabitacionAdminRepository {
  private apiUrl = `${environment.apiUrl}/Habitacion`;

  constructor(private http: HttpClient) {}

  getPorTipo(tipoId: number): Observable<HabitacionAdmin[]> {
    return this.http.get<HabitacionAdmin[]>(`${this.apiUrl}/por-tipo/${tipoId}`);
  }

  getSiguienteNumero(): Observable<{ numero: string }> {
    return this.http.get<{ numero: string }>(`${this.apiUrl}/siguiente-numero`);
  }

  agregar(numeroHabitacion: string, tipoId: number): Observable<void> {
    return this.http.post<void>(this.apiUrl, { numeroHabitacion, tipoId });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleEstado(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/estado`, {});
  }

  getResumenPorTipo(): Observable<ResumenHabitacion[]> {
  return this.http.get<ResumenHabitacion[]>(`${this.apiUrl}/resumen-por-tipo`);
}
}
