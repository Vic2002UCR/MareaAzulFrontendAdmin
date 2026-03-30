import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facilidad } from '../../domain/entities/facilidad.entity';
import { FacilidadRepository } from '../../domain/interfaces/facilidad.repository';

@Injectable()
export class FacilidadTestRepository implements FacilidadRepository {
  getFacilidades(): Observable<Facilidad[]> {
    const facilidades: Facilidad[] = [
      {
        idFacilidad: 1,
        nombre: 'Piscina',
        descripcion: 'Disfruta de nuestra piscina con vista relajante.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 2,
        nombre: 'Restaurante',
        descripcion: 'Comida de calidad con un ambiente acogedor.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 3,
        nombre: 'Parqueo',
        descripcion: 'Espacio amplio y seguro para tu vehículo.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
            {
        idFacilidad: 1,
        nombre: 'Piscina',
        descripcion: 'Disfruta de nuestra piscina con vista relajante.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 2,
        nombre: 'Restaurante',
        descripcion: 'Comida de calidad con un ambiente acogedor.',
        imgUrl: '/assets/img/services/restaurant.png'
      },
      {
        idFacilidad: 3,
        nombre: 'Parqueo',
        descripcion: 'Espacio amplio y seguro para tu vehículo.',
        imgUrl: '/assets/img/services/restaurant.png'
      }
    ];

    return of(facilidades);
  }
}