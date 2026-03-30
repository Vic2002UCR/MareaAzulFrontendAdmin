import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoHabitacion } from '../../domain/entities/tipo-habitacion.entity';
import { TipoHabitacionRepository } from '../../domain/interfaces/tipo-habitacion.repository';

@Injectable()
export class TipoHabitacionTestRepository implements TipoHabitacionRepository {
  getTiposHabitacion(): Observable<TipoHabitacion[]> {
    return of([
      {
        id: 1,
        nombre: 'Habitación Doble',
        descripcion: 'Perfecta para parejas, cómoda y espaciosa.',
        capacidad: 2,
        tarifa: 120,
        imgUrl: '/assets/img/room/room-b1.jpg'
      },
      {
        id: 2,
        nombre: 'Habitación Familiar',
        descripcion: 'Ideal para familias, con mayor espacio.',
        capacidad: 5,
        tarifa: 250,
        imgUrl: '/assets/img/room/room-b2.jpg'
      },
      {
        id: 3,
        nombre: 'Suite Deluxe',
        descripcion: 'Experiencia premium con todas las comodidades.',
        capacidad: 3,
        tarifa: 350,
        imgUrl: '/assets/img/room/room-b3.jpg'
      },
      {
        id: 1,
        nombre: 'Habitación Doble',
        descripcion: 'Perfecta para parejas, cómoda y espaciosa.',
        capacidad: 2,
        tarifa: 120,
        imgUrl: '/assets/img/room/room-b1.jpg'
      },
      {
        id: 3,
        nombre: 'Suite Deluxe',
        descripcion: 'Experiencia premium con todas las comodidades.',
        capacidad: 3,
        tarifa: 350,
        imgUrl: '/assets/img/room/room-b3.jpg'
      },
      {
        id: 2,
        nombre: 'Habitación Familiar',
        descripcion: 'Ideal para familias, con mayor espacio.',
        capacidad: 5,
        tarifa: 250,
        imgUrl: '/assets/img/room/room-b2.jpg'
      },
      {
        id: 3,
        nombre: 'Suite Deluxe',
        descripcion: 'Experiencia premium con todas las comodidades.',
        capacidad: 3,
        tarifa: 350,
        imgUrl: '/assets/img/room/room-b3.jpg'
      }
    ]);
  }
}