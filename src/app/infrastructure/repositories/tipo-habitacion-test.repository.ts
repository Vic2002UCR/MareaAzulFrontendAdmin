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
        id: 4,
        nombre: 'Habitación Individual',
        descripcion: 'Ideal para viajeros solos que buscan comodidad.',
        capacidad: 1,
        tarifa: 90,
        imgUrl: '/assets/img/room/room-b1.jpg'
      },
      {
        id: 5,
        nombre: 'Habitación Triple',
        descripcion: 'Espacio cómodo para grupos pequeños o amigos.',
        capacidad: 3,
        tarifa: 180,
        imgUrl: '/assets/img/room/room-b2.jpg'
      },
      {
        id: 6,
        nombre: 'Suite Junior',
        descripcion: 'Elegante y acogedora, con un toque de lujo.',
        capacidad: 2,
        tarifa: 220,
        imgUrl: '/assets/img/room/room-b3.jpg'
      },
      {
        id: 7,
        nombre: 'Suite Ejecutiva',
        descripcion: 'Perfecta para estancias largas con mayor confort.',
        capacidad: 2,
        tarifa: 300,
        imgUrl: '/assets/img/room/room-b1.jpg'
      },
      {
        id: 8,
        nombre: 'Bungalow frente al mar',
        descripcion: 'Disfruta de vistas al mar en un ambiente privado.',
        capacidad: 4,
        tarifa: 400,
        imgUrl: '/assets/img/room/room-b2.jpg'
      },
      {
        id: 9,
        nombre: 'Habitación Premium',
        descripcion: 'Mayor lujo y detalles exclusivos para tu estadía.',
        capacidad: 2,
        tarifa: 280,
        imgUrl: '/assets/img/room/room-b3.jpg'
      },
      {
        id: 10,
        nombre: 'Penthouse',
        descripcion: 'La mejor vista y experiencia de lujo del hotel.',
        capacidad: 4,
        tarifa: 500,
        imgUrl: '/assets/img/room/room-b1.jpg'
      }
    ]);
  }
}