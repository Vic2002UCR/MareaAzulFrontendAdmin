import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoHabitacionRepository, ActualizarTipoHabitacionRequest } from '../domain/interfaces/tipo-habitacion.repository';

@Injectable({ providedIn: 'root' })
export class UpdateTipoHabitacionUseCase {
  private readonly repository = inject(TipoHabitacionRepository);

  execute(id: number, data: ActualizarTipoHabitacionRequest): Observable<void> {
    return this.repository.update(id, data);
  }
}
