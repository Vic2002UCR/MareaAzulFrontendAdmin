import { Component, inject, OnInit } from "@angular/core";
import { GetReservaUseCase } from "../application/get-reserva.use-cases";
import { Reserva } from "../domain/entities/reserva.entity";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { forkJoin } from "rxjs";
import { GetHabitacionUseCase } from "../application/get-habitacion.use-cases";
import { GetTiposHabitacionUseCase } from "../application/get-tipos-habitacion.use-case";
import { DatePipe } from "@angular/common";
import { ReservaTestRepository } from "../infrastructure/repositories/reserva-test.repository";

@Component({
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, DatePipe],
  templateUrl: "./reserva.component.html",
  styleUrl: "./reserva.component.css",
})
export class ReservaComponent implements OnInit {
  private readonly getReservaUseCase: GetReservaUseCase =
    inject(GetReservaUseCase);
  private readonly getHabitacion = inject(GetHabitacionUseCase);
  private readonly getTiposHabitacion = inject(GetTiposHabitacionUseCase);
  private reservaTestRepo = inject(ReservaTestRepository);

  today: string = "";
  reserva?: Reserva;

  //  variables para el HTML
  fechaLlegadaStr: string = "";
  fechaSalidaStr: string = "";
  tarifa: number = 0;
  habitaciones: any[] = [];
  tipoSeleccionado: number | "" = "";
  habitacionesFiltradas: any[] = [];
  tiposHabitacion: any[] = [];
  mostrarModal = false;
  totalPagar = 0;
  cedula: string = "";
  nombre: string = "";
  apellidos: string = "";
  email: string = "";
  tarjeta: string = "";
  expiracion: string = "";
  cvv: string = "";

  mostrarAlerta = false;
  mensajeAlerta = '';

  ngOnInit(): void {
    this.today = new Date().toISOString().split("T")[0];

    this.getReservaUseCase.execute().subscribe({
      next: (data) => {
        this.reserva = this.reserva = data[0] ?? {
          idReserva: 0,
          idCliente: 0,
          idHabitacion: [],
          fechaLlegada: new Date(),
          fechaSalida: new Date(),
          fechaReservacion: new Date(),
          totalPagar: 0,
          idOferta: 0,
          tarifa: 0,
        };

        if (this.reserva) {
          this.fechaLlegadaStr = this.toInputDate(this.reserva.fechaLlegada);
          this.fechaSalidaStr = this.toInputDate(this.reserva.fechaSalida);
          this.tarifa = this.reserva.tarifa;
          this.tipoSeleccionado =
            this.reserva.tarifa === 0 ? "" : this.reserva.tarifa;
        }
        this.totalPagar = this.reserva.totalPagar;

        console.log("Reserva recibida:", this.reserva);
      },
      error: (err) => console.error(err),
    });

    this.cargarHabitaciones();
  }

  //  validar fechas
  onCheckInChange() {
    if (this.fechaSalidaStr && this.fechaSalidaStr <= this.fechaLlegadaStr) {
      this.fechaSalidaStr = "";
    }
  }

  //  convertir Date → string (para input)
  toInputDate(date: Date): string {
    return new Date(date).toISOString().split("T")[0];
  }

  //  convertir string → Date (para guardar)
  updateReservaFechas() {
    if (!this.reserva) return;

    this.reserva.fechaLlegada = new Date(this.fechaLlegadaStr);
    this.reserva.fechaSalida = new Date(this.fechaSalidaStr);
  }

  cargarHabitaciones() {
    const fechaEntrada = new Date(this.fechaLlegadaStr);
    const fechaSalida = new Date(this.fechaSalidaStr);

    forkJoin({
      habs: this.getHabitacion.execute(fechaEntrada, fechaSalida),
      tipos: this.getTiposHabitacion.execute(),
    }).subscribe(({ habs, tipos }) => {
      this.tiposHabitacion = tipos;

      this.habitaciones = habs
        .filter((h) => h.estado === true)
        .map((h) => ({
          ...h,
          tipo: tipos.find((t) => t.id === h.tipo),
        }));

      this.habitacionesFiltradas = this.habitaciones;
    });

    this.filtrarHabitaciones();
  }

  filtrarHabitaciones() {
    if (!this.tipoSeleccionado) {
      this.habitacionesFiltradas = this.habitaciones;
      return;
    }

    this.habitacionesFiltradas = this.habitaciones.filter(
      (h) => h.tipo?.id === Number(this.tipoSeleccionado),
    );
  }

  // Agrega habitación a la reserva y recalcula totales
  agregarReserva(habitacion: any) {
    if (!this.reserva) return;

    // Agregar idHabitacion al arreglo de la reserva
    if (!this.reserva.idHabitacion.includes(habitacion.idHabitacion)) {
      this.reserva.idHabitacion.push(habitacion.idHabitacion);

      // Agregar tarifa de la habitación a totalPagar
      this.reserva.totalPagar += habitacion.precio;

      // Actualizar subtotal y cargos adicionales
      // this.calcularTotales();
      console.log(this.reserva);
    }
  }

  getHabitacionesReservadas() {
    if (!this.reserva) return [];

    return this.habitaciones.filter((h) =>
      this.reserva!.idHabitacion.includes(h.idHabitacion),
    );
  }

  getSubtotal(): number {
  return this.getHabitacionesReservadas().reduce(
    (acc, h) => acc + (h.precio || 0),
    0,
  );
}

  abrirModal() {
    this.mostrarModal = true;
    console.log("CLICK FUNCIONA");
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  validarPago() {
    // Validar campos vacíos
    if (
      !this.cedula ||
      !this.nombre ||
      !this.apellidos ||
      !this.email ||
      !this.tarjeta ||
      !this.expiracion ||
      !this.cvv
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    // Validar cédula (solo números y 9 o 12 dígitos)
    if (!/^\d{9}$|^\d{12}$/.test(this.cedula)) {
      alert("La cédula debe tener 9 o 12 dígitos numericos");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert("Correo electrónico inválido");
      return;
    }

    // Validar tarjeta (16 dígitos)
    const tarjetaLimpia = this.tarjeta.replace(/\s/g, "");
    if (!/^\d{16}$/.test(tarjetaLimpia)) {
      alert("Número de tarjeta inválido (16 dígitos)");
      return;
    }

    // Validar CVV (3 dígitos)
    if (!/^\d{3}$/.test(this.cvv)) {
      alert("CVV inválido");
      return;
    }

    // Validar formato MM/AA
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiracion)) {
      alert("Fecha de expiración inválida (MM/AA)");
      return;
    }

    // Validar que no esté vencida
    const [mes, anio] = this.expiracion.split("/");
    const mesNum = Number(mes);
    const anioNum = Number("20" + anio);

    // Fecha actual
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();

    // Comparación
    if (
      anioNum < anioActual ||
      (anioNum === anioActual && mesNum < mesActual)
    ) {
      alert("La tarjeta está vencida");
      return;
    }

    // Si todo está bien
    alert("Pago realizado con éxito ");

    // Aquí puedes llamar tu servicio o guardar
    if (!this.reserva) return;

    this.reservaTestRepo.saveReserva(this.reserva).subscribe({
      next: (resp) => {
        this.mensajeAlerta = resp.mensaje;
        this.mostrarAlerta = true;

        console.log("Reserva guardada:", resp);

        this.cerrarModal();
      },
      error: () => {
        this.mensajeAlerta = "Error al guardar la reserva";
        this.mostrarAlerta = true;
      },
    });
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;
  }

  onFechasChange() {
    if (this.fechaLlegadaStr && this.fechaSalidaStr) {
      this.cargarHabitaciones();
    }
  }

}
