import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TipoHabitacion } from '../domain/entities/tipo-habitacion.entity';
import { HabitacionAdmin, HabitacionAdminRepository } from '../domain/interfaces/habitacion-admin.repository';
import { GetTiposHabitacionUseCase } from '../application/get-tipos-habitacion.use-case';
import { UpdateTipoHabitacionUseCase } from '../application/update-tipo-habitacion.use-case';
import { TipoHabitacionRepository } from '../domain/interfaces/tipo-habitacion.repository';
import { UploadService } from '../infrastructure/services/upload.service';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent implements OnInit {

  private readonly getTiposUseCase = inject(GetTiposHabitacionUseCase);
  private readonly updateUseCase = inject(UpdateTipoHabitacionUseCase);
  private readonly tipoRepo = inject(TipoHabitacionRepository);
  private readonly habAdminRepo = inject(HabitacionAdminRepository);
  private readonly uploadService = inject(UploadService);

  // ── Vista principal ──────────────────────────────────────────────────
  tiposHabitacion: TipoHabitacion[] = [];

  // ── Modal notificación (éxito / error de página) ─────────────────────
  mostrarNotif = false;
  textoNotif   = '';
  tipoNotif: 'exito' | 'error' = 'exito';
  private notifTimer: ReturnType<typeof setTimeout> | null = null;

  cerrarNotif(): void {
    this.mostrarNotif = false;
    if (this.notifTimer) clearTimeout(this.notifTimer);
  }

  // ── Carrusel ─────────────────────────────────────────────────────────
  carouselIndex = 0;
  readonly visiblesCount = 3;

  get tiposVisibles(): TipoHabitacion[] {
    return this.tiposHabitacion.slice(this.carouselIndex, this.carouselIndex + this.visiblesCount);
  }
  get trackTransform(): string {
    const pct = this.carouselIndex * (100 / this.visiblesCount);
    return `translateX(-${pct}%)`;
  }

  puedeAnterior(): boolean { return this.carouselIndex > 0; }
  puedeSiguiente(): boolean { return this.carouselIndex + this.visiblesCount < this.tiposHabitacion.length; }
  anterior(): void { if (this.puedeAnterior()) this.carouselIndex--; }
  siguiente(): void { if (this.puedeSiguiente()) this.carouselIndex++; }

  // ── Modal editar ─────────────────────────────────────────────────────
  mostrarModal = false;
  guardando = false;

  form = { id: 0, nombre: '', descripcion: '', capacidad: 1, tarifa: 0, imageUrl: '' };
  valorOriginal = { nombre: '', descripcion: '', capacidad: 1, tarifa: 0, imageUrl: '' };
  previewUrl = '';
  errorModal = '';

  habitaciones: HabitacionAdmin[] = [];
  cargandoHabitaciones = false;

  // ── Modal confirmar eliminar tipo ────────────────────────────────────
  mostrarConfirmarEliminar = false;
  tipoAEliminar: TipoHabitacion | null = null;

  // ── Modal confirmar eliminar habitación individual ───────────────────
  mostrarConfirmarEliminarHab = false;
  habAEliminar: HabitacionAdmin | null = null;

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos(): void {
    this.getTiposUseCase.execute().subscribe({
      next: tipos => {
        this.tiposHabitacion = tipos;
        // Ajustar índice si quedó fuera de rango tras una eliminación
        const maxIndex = Math.max(0, tipos.length - this.visiblesCount);
        if (this.carouselIndex > maxIndex) this.carouselIndex = maxIndex;
      },
      error: () => this.abrirNotif('error', 'Error al cargar los tipos de habitación')
    });
  }

  // ── Acciones tarjetas ────────────────────────────────────────────────

  abrirEditar(tipo: TipoHabitacion): void {
    this.form = { id: tipo.id, nombre: tipo.nombre, descripcion: tipo.descripcion, capacidad: tipo.capacidad, tarifa: tipo.tarifa, imageUrl: tipo.imgUrl };
    this.valorOriginal = { nombre: tipo.nombre, descripcion: tipo.descripcion, capacidad: tipo.capacidad, tarifa: tipo.tarifa, imageUrl: tipo.imgUrl };
    this.previewUrl = tipo.imgUrl;
    this.errorModal = '';
    this.habitaciones = [];
    this.mostrarModal = true;
    this.cargarHabitaciones(tipo.id);
  }

  pedirConfirmarEliminar(tipo: TipoHabitacion): void {
    this.tipoAEliminar = tipo;
    this.mostrarConfirmarEliminar = true;
  }

  confirmarEliminar(): void {
    if (!this.tipoAEliminar) return;
    this.tipoRepo.delete(this.tipoAEliminar.id).subscribe({
      next: () => {
        this.mostrarConfirmarEliminar = false;
        this.tipoAEliminar = null;
        this.mostrarExito('Tipo de habitación eliminado correctamente');
        this.cargarTipos();
      },
      error: err => {
        this.mostrarConfirmarEliminar = false;
        this.abrirNotif('error', err?.error?.mensaje || 'Error al eliminar el tipo de habitación');
      }
    });
  }

  cancelarEliminar(): void {
    this.mostrarConfirmarEliminar = false;
    this.tipoAEliminar = null;
  }

  // ── Modal editar ─────────────────────────────────────────────────────

  cerrarModal(): void {
    this.mostrarModal = false;
    this.errorModal = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.uploadService.uploadImage(file, 'tipos').subscribe({
      next: res => { this.form.imageUrl = res.url; this.previewUrl = res.url; },
      error: () => this.errorModal = 'Error al subir la imagen'
    });
  }

  hayCambios(): boolean {
    return (
      this.form.nombre.trim() !== this.valorOriginal.nombre.trim() ||
      this.form.descripcion.trim() !== this.valorOriginal.descripcion.trim() ||
      this.form.capacidad !== this.valorOriginal.capacidad ||
      this.form.tarifa !== this.valorOriginal.tarifa ||
      this.form.imageUrl !== this.valorOriginal.imageUrl
    );
  }

  puedeGuardar(): boolean {
    return !this.guardando && this.hayCambios() &&
      this.form.nombre.trim().length > 0 &&
      this.form.descripcion.trim().length > 0 &&
      this.form.capacidad > 0 &&
      this.form.tarifa > 0 &&
      this.form.imageUrl.trim().length > 0;
  }

  guardar(): void {
    if (!this.puedeGuardar()) return;
    this.guardando = true;
    this.errorModal = '';

    this.updateUseCase.execute(this.form.id, {
      nombre: this.form.nombre.trim(),
      descripcion: this.form.descripcion.trim(),
      capacidad: this.form.capacidad,
      tarifa: this.form.tarifa,
      imageUrl: this.form.imageUrl.trim()
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.cerrarModal();
        this.mostrarExito('Habitación actualizada correctamente');
        this.cargarTipos();
      },
      error: err => {
        this.guardando = false;
        this.errorModal = err?.error?.mensaje || 'Error al guardar los cambios';
      }
    });
  }

  // ── Habitaciones individuales ────────────────────────────────────────

  cargarHabitaciones(tipoId: number): void {
    this.cargandoHabitaciones = true;
    this.habAdminRepo.getPorTipo(tipoId).subscribe({
      next: data => { this.habitaciones = data; this.cargandoHabitaciones = false; },
      error: () => { this.cargandoHabitaciones = false; }
    });
  }

  agregarHabitacion(): void {
    this.habAdminRepo.getSiguienteNumero().subscribe({
      next: res => {
        this.habAdminRepo.agregar(res.numero, this.form.id).subscribe({
          next: () => this.cargarHabitaciones(this.form.id),
          error: err => this.errorModal = err?.error?.mensaje || 'Error al agregar habitación'
        });
      },
      error: () => this.errorModal = 'Error al obtener número de habitación'
    });
  }

  pedirConfirmarEliminarHab(hab: HabitacionAdmin): void {
    this.habAEliminar = hab;
    this.mostrarConfirmarEliminarHab = true;
  }

  confirmarEliminarHab(): void {
    if (!this.habAEliminar) return;
    this.habAdminRepo.eliminar(this.habAEliminar.idHabitacion).subscribe({
      next: () => {
        this.mostrarConfirmarEliminarHab = false;
        this.habAEliminar = null;
        this.cargarHabitaciones(this.form.id);
      },
      error: err => {
        this.mostrarConfirmarEliminarHab = false;
        this.habAEliminar = null;
        const msg: string = err?.error?.mensaje ?? '';
        if (err?.status === 404) {
          this.errorModal = 'La habitación no existe en la base de datos.';
        } else if (msg.toLowerCase().includes('reservaci')) {
          this.errorModal = 'No se puede eliminar la habitación porque tiene reservaciones activas asociadas.';
        } else {
          this.errorModal = 'Ocurrió un error al eliminar la habitación. Intente nuevamente.';
        }
      }
    });
  }

  cancelarEliminarHab(): void {
    this.mostrarConfirmarEliminarHab = false;
    this.habAEliminar = null;
  }

  toggleEstado(hab: HabitacionAdmin): void {
    this.habAdminRepo.toggleEstado(hab.idHabitacion).subscribe({
      next: () => hab.estado = !hab.estado,
      error: () => this.errorModal = 'Error al cambiar el estado'
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────

  private mostrarExito(msg: string): void {
    this.abrirNotif('exito', msg);
  }

  private abrirNotif(tipo: 'exito' | 'error', msg: string): void {
    if (this.notifTimer) clearTimeout(this.notifTimer);
    this.tipoNotif   = tipo;
    this.textoNotif  = msg;
    this.mostrarNotif = true;
    this.notifTimer  = setTimeout(() => this.mostrarNotif = false, 3500);
  }
}
