import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './infrastructure/interceptors/auth.interceptor';
import { routes } from "./app.routes";
import { HotelRepository } from "./domain/interfaces/hotel.repository";
import { FacilidadRepository } from "./domain/interfaces/facilidad.repository";
import { TipoHabitacionRepository } from "./domain/interfaces/tipo-habitacion.repository";
import { TipoHabitacionRemoteRepository } from "./infrastructure/repositories/tipo-habitacion-remote.repository";
import { ReservaRepository } from "./domain/interfaces/reserva.repository";
import { ReservaLocalRepository } from "./infrastructure/repositories/reserva-local.repository";
import { HabitacionRepository } from "./domain/interfaces/habitacion.repository";
import { HabitacionTestRepository } from "./infrastructure/repositories/habitacion-test.repository";
import { HabitacionAdminRepository } from "./domain/interfaces/habitacion-admin.repository";
import { HabitacionAdminRemoteRepository } from "./infrastructure/repositories/habitacion-admin-remote.repository";
import { TemporadaRepository } from "./domain/interfaces/temporada.repository";
import { TemporadaRemoteRepository } from "./infrastructure/repositories/temporada-remote.repository";
import { PublicidadRepository } from "./domain/interfaces/publicidad.repository";
import { PublicidadRemoteRepository } from "./infrastructure/repositories/publicidad-remote.repository";
import { OfertaRepository } from "./domain/interfaces/oferta.repository";
import { OfertaRemoteRepository } from "./infrastructure/repositories/oferta-remote.repository";
import { HabitacionDisponibilidadRepository } from "./domain/interfaces/habitacion-disponibilidad.repository";
import { HabitacionEstadoRepository } from "./domain/interfaces/habitacion-estado.repository";
import { HabitacionRemoteRepository } from "./infrastructure/repositories/habitacion-remote.repository";
import { AuthRepository } from './domain/interfaces/auth.repository';
import { AuthRemoteRepository } from './infrastructure/repositories/auth-remote.repository';
import { HotelRemoteRepository } from "./infrastructure/repositories/hotel-remote.repository";
import { FacilidadRemoteRepository } from "./infrastructure/repositories/facilidad-remote.repository";
import { DashboardRepository } from "./domain/interfaces/dashboard.repository";
import { DashboardRemoteRepository } from "./infrastructure/repositories/dashboard-http.repository";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: "enabled", scrollPositionRestoration: "enabled" })),
    { provide: AuthRepository, useClass: AuthRemoteRepository },
    { provide: HotelRepository, useClass: HotelRemoteRepository },
    { provide: FacilidadRepository, useClass: FacilidadRemoteRepository },
    { provide: TipoHabitacionRepository, useClass: TipoHabitacionRemoteRepository },
    { provide: ReservaRepository, useClass: ReservaLocalRepository },
    { provide: HabitacionRepository, useClass: HabitacionTestRepository },
    { provide: HabitacionAdminRepository, useClass: HabitacionAdminRemoteRepository },
    { provide: TemporadaRepository, useClass: TemporadaRemoteRepository },
    { provide: PublicidadRepository, useClass: PublicidadRemoteRepository },
    { provide: OfertaRepository, useClass: OfertaRemoteRepository },
    { provide: HabitacionDisponibilidadRepository, useClass: HabitacionRemoteRepository },
    { provide: HabitacionEstadoRepository, useClass: HabitacionRemoteRepository },
    { provide: DashboardRepository, useClass: DashboardRemoteRepository },
    
  ],
};
