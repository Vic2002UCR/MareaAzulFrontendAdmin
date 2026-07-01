import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor, NgClass, NgTemplateOutlet, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListarReservasUseCase } from '../application/listar-reservas.use-case';
import { CancelarReservaUseCase } from '../application/cancelar-reserva.use-case';
import { ReservaAdmin } from '../domain/entities/reserva-admin.entity';
import { ConfirmService } from '../shared/confirm/confirm.service';
import { AlertService } from '../shared/alerts/alert/alert.service';

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgTemplateOutlet, DecimalPipe, DatePipe, FormsModule],
  templateUrl: './reservaciones.component.html',
  styleUrl: './reservaciones.component.css'
})
export class ReservacionesComponent implements OnInit {
  private readonly listarUseCase = inject(ListarReservasUseCase);
  private readonly cancelarUseCase = inject(CancelarReservaUseCase);
  private readonly confirm = inject(ConfirmService);
  private readonly alert = inject(AlertService);

  cargando = true;
  error = false;
  cancelandoId: number | null = null;
  busqueda = '';

  private reservas: ReservaAdmin[] = [];

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = false;
    this.listarUseCase.execute().subscribe({
      next: (data) => {
        this.reservas = data ?? [];
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.error = true;
      }
    });
  }

  // ── Filtrado ──────────────────────────────────────────────
  private get filtradas(): ReservaAdmin[] {
    const q = this.busqueda.trim().toLowerCase();
    if (!q) return this.reservas;
    return this.reservas.filter(r =>
      r.cliente.toLowerCase().includes(q) ||
      r.numeroReservacion.toLowerCase().includes(q) ||
      (r.cedula ?? '').toLowerCase().includes(q) ||
      (r.email ?? '').toLowerCase().includes(q) ||
      r.habitaciones.toLowerCase().includes(q)
    );
  }

  get enHotel(): ReservaAdmin[] { return this.filtradas.filter(r => r.diasParaLlegada < 0); }
  get lleganHoy(): ReservaAdmin[] { return this.filtradas.filter(r => r.diasParaLlegada === 0); }
  get proximas(): ReservaAdmin[] { return this.filtradas.filter(r => r.diasParaLlegada > 0); }
  get hayResultados(): boolean { return this.filtradas.length > 0; }

  // ── KPIs ──────────────────────────────────────────────────
  get totalVigentes(): number { return this.reservas.length; }
  get totalHoy(): number { return this.reservas.filter(r => r.diasParaLlegada === 0).length; }
  get totalEnHotel(): number { return this.reservas.filter(r => r.diasParaLlegada < 0).length; }
  get ingresosEsperados(): number { return this.reservas.reduce((s, r) => s + r.totalPagar, 0); }

  // ── Helpers de presentación ───────────────────────────────
  noches(r: ReservaAdmin): number {
    const a = new Date(r.fechaLlegada).getTime();
    const b = new Date(r.fechaSalida).getTime();
    return Math.max(1, Math.round((b - a) / 86_400_000));
  }

  etiquetaLlegada(r: ReservaAdmin): string {
    if (r.diasParaLlegada < 0) return 'En el hotel';
    if (r.diasParaLlegada === 0) return 'Llega hoy';
    if (r.diasParaLlegada === 1) return 'Llega mañana';
    return `En ${r.diasParaLlegada} días`;
  }

  claseLlegada(r: ReservaAdmin): string {
    if (r.diasParaLlegada < 0) return 'en-hotel';
    if (r.diasParaLlegada === 0) return 'hoy';
    if (r.diasParaLlegada <= 3) return 'pronto';
    return 'futura';
  }

  estadoClase(estado: string): string {
    return estado.toLowerCase() === 'confirmada' ? 'confirmada' : 'pendiente';
  }

  // ── Cancelación ───────────────────────────────────────────
  cancelar(r: ReservaAdmin): void {
    this.confirm.open(
      `¿Cancelar la reserva ${r.numeroReservacion} de ${r.cliente}? Esta acción no se puede deshacer.`,
      () => this.ejecutarCancelacion(r)
    );
  }

  private ejecutarCancelacion(r: ReservaAdmin): void {
    this.cancelandoId = r.idReserva;
    this.cancelarUseCase.execute(r.idReserva).subscribe({
      next: (res) => {
        this.cancelandoId = null;
        if (res.exito) {
          this.reservas = this.reservas.filter(x => x.idReserva !== r.idReserva);
          this.alert.success(res.mensaje, 'Reserva cancelada');
        } else {
          this.alert.error(res.mensaje);
        }
      },
      error: (err) => {
        this.cancelandoId = null;
        const msg = err?.error?.mensaje ?? 'No se pudo cancelar la reserva. Inténtelo nuevamente.';
        this.alert.error(msg);
      }
    });
  }

  trackById(_i: number, r: ReservaAdmin): number { return r.idReserva; }
}
