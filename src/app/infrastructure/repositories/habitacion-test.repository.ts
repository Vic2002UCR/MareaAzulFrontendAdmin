// infrastructure/repositories/habitacion-test.repository.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Habitacion } from '../../domain/entities/habitacion.entity';
import { HabitacionRepository } from '../../domain/interfaces/habitacion.repository';

@Injectable()
export class HabitacionTestRepository implements HabitacionRepository {

  getHabitacion(): Observable<Habitacion[]> {
    return of([
      {
        idHabitacion: 1,
        numeroHabitacion: 101,
        tipo: 1,
        estado: false
      },
      {
        idHabitacion: 2,
        numeroHabitacion: 102,
        tipo: 2,
        estado: true
      },
      {
        idHabitacion: 3,
        numeroHabitacion: 201,
        tipo: 3,
        estado: false
      },
      {
        idHabitacion: 4,
        numeroHabitacion: 202,
        tipo: 1,
        estado: false
      },
      {
        idHabitacion: 5,
        numeroHabitacion: 301,
        tipo: 2,
        estado: true
      },
      {
        idHabitacion: 6,
        numeroHabitacion: 302,
        tipo: 3,
        estado: true
      }
    ]);
  }
}