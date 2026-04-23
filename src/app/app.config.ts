import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";

import { HotelRepository } from "./domain/interfaces/hotel.repository";
import { HotelTestRepository } from "./infrastructure/repositories/hotel-test.repository";
import { FacilidadRepository } from "./domain/interfaces/facilidad.repository";
import { FacilidadTestRepository } from "./infrastructure/repositories/facilidad-test.repository";
import { TipoHabitacionRepository } from "./domain/interfaces/tipo-habitacion.repository";
import { TipoHabitacionTestRepository } from "./infrastructure/repositories/tipo-habitacion-test.repository";
import { ReservaRepository } from "./domain/interfaces/reserva.repository";
import { ReservaLocalRepository } from "./infrastructure/repositories/reserva-local.repository";
import { HabitacionRepository } from "./domain/interfaces/habitacion.repository";
import { HabitacionTestRepository } from "./infrastructure/repositories/habitacion-test.repository";
import { TemporadaRepository } from "./domain/interfaces/temporada.repository";
import { TemporadaRemoteRepository } from "./infrastructure/repositories/temporada-remote.repository";
import { PublicidadRepository } from "./domain/interfaces/publicidad.repository";
import { PublicidadRemoteRepository } from "./infrastructure/repositories/publicidad-remote.repository";
import { OfertaRepository } from "./domain/interfaces/oferta.repository";
import { OfertaRemoteRepository } from "./infrastructure/repositories/oferta-remote.repository";
import { HabitacionDisponibilidadRepository } from "./domain/interfaces/habitacion-disponibilidad.repository";
import { HabitacionEstadoRepository } from "./domain/interfaces/habitacion-estado.repository";
import { HabitacionRemoteRepository } from "./infrastructure/repositories/habitacion-remote.repository";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ),
    {
      provide: HotelRepository,
      useClass: HotelTestRepository,
    },
    {
      provide: FacilidadRepository,
      useClass: FacilidadTestRepository,
    },
    {
      provide: TipoHabitacionRepository,
      useClass: TipoHabitacionTestRepository,
    },
    {
      provide: ReservaRepository,
      useClass: ReservaLocalRepository,
    },
    {
      provide: HabitacionRepository,
      useClass: HabitacionTestRepository,
    },
    {
      provide: TemporadaRepository,
      useClass: TemporadaRemoteRepository,
    },
    {
      provide: PublicidadRepository,
      useClass: PublicidadRemoteRepository,
    },
    {
      provide: OfertaRepository,
      useClass: OfertaRemoteRepository,
    },
    {
      provide: HabitacionDisponibilidadRepository,
      useClass: HabitacionRemoteRepository,
    },
    {
      provide: HabitacionEstadoRepository,
      useClass: HabitacionRemoteRepository,
    },
  ],
};
