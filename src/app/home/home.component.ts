import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetHotelUseCase } from '../application/get-hotel.use-case';
import { Hotel } from '../domain/entities/hotel.entity';
import { NgIf, NgFor } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GetFacilidadesUseCase } from '../application/get-facilidades.use-case';
import { Facilidad } from '../domain/entities/facilidad.entity';
import { GetTiposHabitacionUseCase } from '../application/get-tipos-habitacion.use-case';
import { TipoHabitacion } from '../domain/entities/tipo-habitacion.entity';
import { SetReservaUseCase } from '../application/set-reserva.use-case';
import { Reserva } from '../domain/entities/reserva.entity';

@Component({
  standalone: true,
  imports: [NgIf, NgFor,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  safeMapUrl?: SafeResourceUrl;

  currentYear = new Date().getFullYear();

  private readonly getHotelUseCase = inject(GetHotelUseCase);
  private sanitizer = inject(DomSanitizer);
  private readonly getFacilidadesUseCase = inject(GetFacilidadesUseCase);
  private readonly getTiposHabitacionUseCase = inject(GetTiposHabitacionUseCase);
  private readonly setReservaUseCase: SetReservaUseCase = inject(SetReservaUseCase);
  private router = inject(Router);

  hotel?: Hotel;
  facilidades: Facilidad[] = [];
  tiposHabitacion: TipoHabitacion[] = [];
  tipoSeleccionado: number=0;
  dateIn: string = '';
  dateOut: string = '';
  tarifa: number = 0;

  formValido(): boolean {
    return (
      this.dateIn !== '' &&
      this.dateOut !== '' &&
      this.tipoSeleccionado > 0
    );
  }

  ngOnInit(): void {
    this.getHotelUseCase.execute().subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          hotel.googleMapLink
        );
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.getFacilidadesUseCase.execute().subscribe({
      next: (facilidades) => {
        this.facilidades = facilidades;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.getTiposHabitacionUseCase.execute().subscribe({
      next: (tipos) => {
        this.tiposHabitacion = tipos;
      },
      error: (err) => console.error(err)
    });

    const today = new Date().toISOString().split('T')[0];

    const checkIn = document.getElementById("date-in") as HTMLInputElement;
    const checkOut = document.getElementById("date-out") as HTMLInputElement;

    checkIn.min = today;
    checkOut.min = today;

    checkIn.addEventListener("change", () => {
      checkOut.min = checkIn.value;
      if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
      }
    });
  }

  currentRoomPage = 0;
  roomsPerPage = 4;

  get visibleTiposHabitacion(): TipoHabitacion[] {
    const start = this.currentRoomPage * this.roomsPerPage;
    const end = start + this.roomsPerPage;
    return this.tiposHabitacion.slice(start, end);
  }

  get totalRoomPages(): number {
    return Math.ceil(this.tiposHabitacion.length / this.roomsPerPage);
  }

  nextRoomPage(): void {
    if (this.currentRoomPage < this.totalRoomPages - 1) {
      this.currentRoomPage++;
    }
  }

  previousRoomPage(): void {
    if (this.currentRoomPage > 0) {
      this.currentRoomPage--;
    }
  }

  onSubmit() {
    if (this.formValido()) {
      const reserva: Reserva = {
        idReserva:0,
        idCliente: 0,
        idHabitacion:[],
        fechaLlegada: new Date(this.dateIn),
        fechaSalida: new Date(this.dateOut),
        fechaReservacion:new Date(),
        totalPagar: 0,
        idOferta:0,
        tarifa:this.tipoSeleccionado
      };

      this.setReservaUseCase.execute(reserva);
      this.router.navigate(['/reserva']);
      console.log('Reserva guardada:', reserva);
    }else {
      console.log('Formulario inválido');
    }
  }
}