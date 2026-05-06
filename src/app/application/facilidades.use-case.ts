import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Facilidad } from '../domain/entities/facilidad.entity';
import { FacilidadRepository } from '../domain/interfaces/facilidad.repository';

@Injectable({
  providedIn: 'root'
})
export class FacilidadUseCase {
  private readonly facilidadRepository = inject(FacilidadRepository);

  obtenerTodas(): Observable<Facilidad[]> {
    return this.facilidadRepository.getAll();
  }

  obtenerPorId(id: number): Observable<Facilidad> {
    return this.facilidadRepository.getById(id);
  }

  obtenerPublicas(): Observable<Facilidad[]> {
    return this.facilidadRepository.getPublicas();
  }

  crear(facilidad: Facilidad): Observable<Facilidad> {
    return this.facilidadRepository.create(facilidad);
  }

  actualizar(id: number, facilidad: Facilidad): Observable<any> {
    return this.facilidadRepository.update(id, facilidad);
  }

  eliminar(id: number): Observable<any> {
    return this.facilidadRepository.delete(id);
  }
}