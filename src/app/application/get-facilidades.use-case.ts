import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Facilidad } from '../domain/entities/facilidad.entity';
import { FacilidadRepository } from '../domain/interfaces/facilidad.repository';

@Injectable({
  providedIn: 'root'
})
export class GetFacilidadesUseCase {
  private readonly facilidadRepository = inject(FacilidadRepository);

  execute(): Observable<Facilidad[]> {
    return this.facilidadRepository.getFacilidades();
  }
}