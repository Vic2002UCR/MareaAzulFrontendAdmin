import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facilidad } from '../../domain/entities/facilidad.entity';
import { FacilidadRepository } from '../../domain/interfaces/facilidad.repository';

@Injectable()
export class FacilidadTestRepository implements FacilidadRepository {
  getFacilidades(): Observable<Facilidad[]> {
    const facilidades: Facilidad[] = [
      {
        idFacilidad: 4,
        nombre: 'Catering Service',
        descripcion: 'Servicio de catering para eventos y ocasiones especiales.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 5,
        nombre: 'Spa',
        descripcion: 'Relájate con nuestros tratamientos de spa y bienestar.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 6,
        nombre: 'Gimnasio',
        descripcion: 'Mantente en forma con nuestro gimnasio totalmente equipado.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 7,
        nombre: 'Wi-Fi',
        descripcion: 'Conexión a internet rápida y gratuita en todo el hotel.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 8,
        nombre: 'Bar',
        descripcion: 'Disfruta de bebidas y cócteles frente al mar.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 9,
        nombre: 'Room Service',
        descripcion: 'Servicio a la habitación disponible para tu comodidad.',
        imgUrl: '/assets/img/services/restaurant.png'
      },

    ];

    return of(facilidades);
  }
}