import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facilidad } from '../../domain/entities/facilidad.entity';
import { FacilidadRepository } from '../../domain/interfaces/facilidad.repository';

@Injectable()
export class FacilidadTestRepository implements FacilidadRepository {
  getAll(): Observable<Facilidad[]> {
    const facilidades: Facilidad[] = [
      {
        id: 4,
        nombre: 'Catering Service',
        descripcion: 'Servicio de catering para eventos y ocasiones especiales.',
        imageUrl: '/assets/img/services/restaurant.png'
      },
      {
        id: 5,
        nombre: 'Spa',
        descripcion: 'Relájate con nuestros tratamientos de spa y bienestar.',
        imageUrl: '/assets/img/services/restaurant.png'
      },
      {
        id: 6,
        nombre: 'Gimnasio',
        descripcion: 'Mantente en forma con nuestro gimnasio totalmente equipado.',
        imageUrl: '/assets/img/services/restaurant.png'
      },
      {
        id: 7,
        nombre: 'Wi-Fi',
        descripcion: 'Conexión a internet rápida y gratuita en todo el hotel.',
        imageUrl: '/assets/img/services/restaurant.png'
      },
      {
        id: 8,
        nombre: 'Bar',
        descripcion: 'Disfruta de bebidas y cócteles frente al mar.',
        imageUrl: '/assets/img/services/restaurant.png'
      },
      {
        id: 9,
        nombre: 'Room Service',
        descripcion: 'Servicio a la habitación disponible para tu comodidad.',
        imageUrl: '/assets/img/services/restaurant.png'
      }
    ];

    return of(facilidades);
  }

  getById(id: number): Observable<Facilidad> {
    const facilidad: Facilidad = {
      id,
      nombre: 'Spa',
      descripcion: 'Relájate con nuestros tratamientos de spa y bienestar.',
      imageUrl: '/assets/img/services/restaurant.png'
    };

    return of(facilidad);
  }

  getPublicas(): Observable<Facilidad[]> {
    return this.getAll();
  }

  create(facilidad: Facilidad): Observable<Facilidad> {
    return of(facilidad);
  }

  update(id: number, facilidad: Facilidad): Observable<any> {
    return of({ mensaje: 'Facilidad actualizada correctamente.' });
  }

  delete(id: number): Observable<any> {
    return of({ mensaje: 'Facilidad eliminada correctamente.' });
  }
}