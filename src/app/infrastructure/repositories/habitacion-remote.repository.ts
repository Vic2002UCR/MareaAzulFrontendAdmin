import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { HabitacionDisponibilidadRepository } from '../../domain/interfaces/habitacion-disponibilidad.repository';
import { HabitacionEstadoRepository } from '../../domain/interfaces/habitacion-estado.repository';
import { Disponibilidad } from '../../domain/entities/disponibilidad.entity';
import { EstadoHoy } from '../../domain/entities/estado-hoy.entity';



@Injectable()
export class HabitacionRemoteRepository
  implements HabitacionDisponibilidadRepository, HabitacionEstadoRepository {

  private baseUrl = 'https://localhost:7151/api/Habitacion';

  constructor(private http: HttpClient) {}

  async consultarDisponibilidad(
    inicio: string,
    fin: string,
    tipoId?: number
  ): Promise<Disponibilidad[]> {

    let url = `${this.baseUrl}/disponibilidad?inicio=${inicio}&fin=${fin}`;

    if (tipoId) {
      url += `&tipoId=${tipoId}`;
    }

    const response = await firstValueFrom(
      this.http.get<Disponibilidad[]>(url)
    );

    return response ?? [];
  }

  async obtenerEstadoHoy(): Promise<EstadoHoy[]> {

    const response = await firstValueFrom(
      this.http.get<EstadoHoy[]>(`${this.baseUrl}/estado-hoy`)
    );

    return response ?? [];
  }
}