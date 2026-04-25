import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HabitacionDisponibilidadRepository } from '../domain/interfaces/habitacion-disponibilidad.repository';
import { HabitacionEstadoRepository } from '../domain/interfaces/habitacion-estado.repository';
import { TipoHabitacionRepository } from '../domain/interfaces/tipo-habitacion.repository';
import { GetDisponibilidadUseCase } from '../application/get-disponibilidad.use-case';
import { GetEstadoHoyUseCase } from '../application/get-estado-hoy.use-case';
import { GetTiposHabitacionUseCase } from '../application/get-tipos-habitacion.use-case';
import { Disponibilidad } from '../domain/entities/disponibilidad.entity';
import { EstadoHoy } from '../domain/entities/estado-hoy.entity';
import { TipoHabitacion } from '../domain/entities/tipo-habitacion.entity';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-estado-del-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estado-del-hotel.component.html',
  styleUrls: ['./estado-del-hotel.component.css']
})
export class EstadoDelHotelComponent implements OnInit {

  private fb = inject(FormBuilder);

  // repos
  private disponibilidadRepo = inject(HabitacionDisponibilidadRepository);
  private estadoRepo = inject(HabitacionEstadoRepository);

  // use cases
  private disponibilidadUseCase = new GetDisponibilidadUseCase(this.disponibilidadRepo);
  private estadoUseCase = new GetEstadoHoyUseCase(this.estadoRepo);
  private tipoUseCase = inject(GetTiposHabitacionUseCase);

  // control de estado
  datosCargados = false;

  // data
  resultadosDisponibilidad: Disponibilidad[] = [];
  resultadosEstado: EstadoHoy[] = [];
  tiposHabitacion: TipoHabitacion[] = [];

  private disponibilidadOriginal: Disponibilidad[] = [];
  private estadoOriginal: EstadoHoy[] = [];

  mostrandoEstadoHoy = false;
  loading = false;
  loadingTipos = false;
  fechaInicioConsulta: string | null = null;
  fechaFinConsulta: string | null = null;

  // form
  form = this.fb.group({
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    tipoId: ['']
  });

  // fecha local correcta
  private getHoy(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async ngOnInit() {
    const hoy = this.getHoy();

    this.form.patchValue({
      fechaInicio: hoy,
      fechaFin: hoy
    }, { emitEvent: false });

    await this.cargarTiposHabitacion();
    await this.estadoHoy();

    // filtro reactivo SOLO si hay datos
    this.form.get('tipoId')?.valueChanges.subscribe(() => {

  // SI NO HAY DATOS → NO HACER NADA
  if (!this.datosCargados) return;

  // SOLO permitir filtro automático en "estado hoy"
  if (this.mostrandoEstadoHoy) {
    this.aplicarFiltro();
  }
});

    // si cambia fechas → invalidar datos
    this.form.get('fechaInicio')?.valueChanges.subscribe(() => {
      this.datosCargados = false;
    });

    this.form.get('fechaFin')?.valueChanges.subscribe(() => {
      this.datosCargados = false;
    });
  }

  async cargarTiposHabitacion() {
    this.loadingTipos = true;

    try {
      this.tiposHabitacion = await firstValueFrom(
        this.tipoUseCase.execute()
      );
    } catch (error) {
      console.error(error);
      alert('Error cargando tipos de habitación');
    } finally {
      this.loadingTipos = false;
    }
  }

  async consultar() {
    if (this.form.invalid) return;

    const { fechaInicio, fechaFin } = this.form.value;
    const tipoId = this.getTipoId();

    if (fechaInicio === fechaFin) {
      alert('La fecha inicial debe ser menor a la final. Use "Al día de hoy" para ver el estado actual de las habitaciones.');
      return;
    }

    if (fechaInicio! > fechaFin!) {
      alert('La fecha inicial debe ser menor a la final');
      return;
    }

    this.loading = true;
    this.mostrandoEstadoHoy = false;

    this.fechaInicioConsulta = fechaInicio!;
    this.fechaFinConsulta = fechaFin!;

    try {
      const data = await this.disponibilidadUseCase.execute(
        fechaInicio!,
        fechaFin!,
        tipoId ?? undefined
      );

      this.resultadosDisponibilidad = data;
      this.disponibilidadOriginal = [...data];

      this.datosCargados = true; // activar filtro

      this.aplicarFiltro();

    } catch (error) {
      console.error(error);
      alert('Error al consultar disponibilidad');
    } finally {
      this.loading = false;
    }
  }

  async estadoHoy() {
    const hoy = this.getHoy();

    this.form.patchValue({
      fechaInicio: hoy,
      fechaFin: hoy,
      tipoId: '' //  TODOS
    }, { emitEvent: false });

    this.loading = true;
    this.mostrandoEstadoHoy = true;
    this.fechaInicioConsulta = hoy;
    try {
      const data = await this.estadoUseCase.execute();

      this.resultadosEstado = data;
      this.estadoOriginal = [...data];

      this.datosCargados = true; // permitir filtro

    } catch (error) {
      console.error(error);
      alert('Error al consultar estado');
    } finally {
      this.loading = false;
    }
  }

  aplicarFiltro() {

  const tipoId = this.getTipoId();

  // CASO ESPECIAL: modo disponibilidad + TODOS + sin datos cargados
  if (!this.mostrandoEstadoHoy && tipoId == null && !this.datosCargados) {
    return; // NO hacer nada (estado edición)
  }

  if (!this.datosCargados) return;

  if (!this.mostrandoEstadoHoy) {

    if (tipoId == null) {
      this.resultadosDisponibilidad = [...this.disponibilidadOriginal];
      return;
    }

    this.resultadosDisponibilidad = this.disponibilidadOriginal.filter(h =>
      this.mapTipoId(h.tipoHabitacion) === tipoId
    );

  } else {
    
    if (tipoId == null) {
      this.resultadosEstado = [...this.estadoOriginal];
      return;
    }

    this.resultadosEstado = this.estadoOriginal.filter(h =>
      this.mapTipoId(h.tipoHabitacion) === tipoId
    );
  }
}

  private getTipoId(): number | null {
    const val = this.form.get('tipoId')?.value;
    if (val === null || val === '') return null;
    return Number(val);
  }

  mapTipoId(nombre: string): number {
    const tipo = this.tiposHabitacion.find(t => t.nombre === nombre);
    return tipo ? tipo.id : 0;
  }
}