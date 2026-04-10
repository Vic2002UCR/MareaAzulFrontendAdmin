import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
<<<<<<< Updated upstream

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
=======
import { ReservaComponent } from './reserva/reserva.component';
import {SitioComponent } from './sitio/sitio.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { EstadoDelHotelComponent } from './estado-del-hotel/estado-del-hotel.component';
import { TemporadasComponent } from './temporadas/temporadas.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'sitio', component: SitioComponent },
  { path: 'reservaciones', component: ReservacionesComponent},
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'estado-hotel', component: EstadoDelHotelComponent },
  { path: 'temporadas', component: TemporadasComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'publicidad', component: PublicidadComponent },
  { path: 'inicio', component: InicioComponent },
>>>>>>> Stashed changes
];