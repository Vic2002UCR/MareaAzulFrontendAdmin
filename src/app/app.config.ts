import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { HotelRepository } from './domain/interfaces/hotel.repository';
import { HotelRemoteRepository } from './infrastructure/repositories/hotel-remote.repository';
import { HotelTestRepository } from './infrastructure/repositories/hotel-test.repository';
import { FacilidadRepository } from './domain/interfaces/facilidad.repository';
import { FacilidadTestRepository } from './infrastructure/repositories/facilidad-test.repository';
import { TipoHabitacionRepository } from './domain/interfaces/tipo-habitacion.repository';
import { TipoHabitacionTestRepository } from './infrastructure/repositories/tipo-habitacion-test.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    {
      provide: HotelRepository,
      useClass: HotelTestRepository
    },
    {
      provide: FacilidadRepository,
      useClass: FacilidadTestRepository
    },
    {
      provide: TipoHabitacionRepository,
      useClass: TipoHabitacionTestRepository
    }

  ]
};