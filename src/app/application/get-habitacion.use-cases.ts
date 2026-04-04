import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HabitacionRepository } from "../domain/interfaces/habitacion.repository";
import { Habitacion } from "../domain/entities/habitacion.entity";

@Injectable({
  providedIn: 'root'
})
export class GetHabitacionUseCase {
  private readonly repository = inject(HabitacionRepository);

  execute(): Observable<Habitacion[]> {
    return this.repository.getHabitacion();
  }
}