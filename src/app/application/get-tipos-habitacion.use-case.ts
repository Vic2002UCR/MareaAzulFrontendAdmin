import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoHabitacion } from '../domain/entities/tipo-habitacion.entity';
import { TipoHabitacionRepository } from '../domain/interfaces/tipo-habitacion.repository';

@Injectable({
  providedIn: 'root'
})
export class GetTiposHabitacionUseCase {
  private readonly repository = inject(TipoHabitacionRepository);

  execute(): Observable<TipoHabitacion[]> {
    return this.repository.getTiposHabitacion();
  }
}