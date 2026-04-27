import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservaComponent } from './reserva/reserva.component';
import {SitioComponent } from './sitio/sitio.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { EstadoDelHotelComponent } from './estado-del-hotel/estado-del-hotel.component';
import { TemporadasComponent } from './temporadas/temporadas.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { InicioComponent } from './inicio/inicio.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // Públicas
  { path: 'inicio', component: InicioComponent },

  // Privadas
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'reserva', component: ReservaComponent, canActivate: [authGuard] },
  { path: 'sitio', component: SitioComponent, canActivate: [authGuard] },
  { path: 'reservaciones', component: ReservacionesComponent, canActivate: [authGuard] },
  { path: 'habitaciones', component: HabitacionesComponent, canActivate: [authGuard] },
  { path: 'estado-hotel', component: EstadoDelHotelComponent, canActivate: [authGuard] },
  { path: 'temporadas', component: TemporadasComponent, canActivate: [authGuard] },
  { path: 'ofertas', component: OfertasComponent, canActivate: [authGuard] },
  { path: 'publicidad', component: PublicidadComponent, canActivate: [authGuard] },

  // Fallback
  { path: '**', redirectTo: 'inicio' }
];