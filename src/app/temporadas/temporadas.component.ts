import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemporadaUseCase } from '../application/temporada.use-case';
import { Temporada } from '../domain/entities/temporada.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temporadas',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './temporadas.component.html',
  styleUrl: './temporadas.component.css'
})
export class TemporadasComponent implements OnInit {

  private readonly useCase = inject(TemporadaUseCase);

  temporadas: Temporada[] = [];

  mostrarModal = false;
  modoEdicion = false;

  mensajeError = '';
  mensajeExito = '';

  temporadaForm: Temporada = this.getVacia();

  ngOnInit(): void {
    this.cargar();
  }

  getVacia(): Temporada {
    return {
      id: 0,
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      porcentaje: 0
    };
  }

  cargar(): void {
    this.useCase.getAll().subscribe({
      next: data => {
        this.temporadas = data;
      },
      error: () => this.mensajeError = 'Error al cargar temporadas'
    });
  }

  abrirAgregar() {
    this.modoEdicion = false;
    this.temporadaForm = this.getVacia();
    this.mostrarModal = true;
  }

  abrirEditar(t: Temporada) {
    this.modoEdicion = true;
    this.mensajeError = ''; // Limpiamos errores previos

    // Creamos una copia para no modificar el objeto original de la tabla
    this.temporadaForm = {
      ...t,
      // Formateamos las fechas a YYYY-MM-DD para que el input tipo date las reconozca
      fechaInicio: this.formatearFechaParaInput(t.fechaInicio),
      fechaFin: this.formatearFechaParaInput(t.fechaFin)
    };

    this.mostrarModal = true;
  }

  // Función auxiliar para transformar la fecha
  private formatearFechaParaInput(fecha: any): string {
    if (!fecha) return '';

    // Si la fecha viene como string de C# (ej: "2026-04-27T00:00:00")
    // Tomamos solo los primeros 10 caracteres
    return fecha.toString().split('T')[0];
  }
  cerrarModal() {
    this.mostrarModal = false;
  }

  guardar() {
    this.mensajeError = ''; // Limpiar errores previos

    const operacion = this.modoEdicion
      ? this.useCase.update(this.temporadaForm.id, this.temporadaForm)
      : this.useCase.create(this.temporadaForm);

    operacion.subscribe({
      next: () => {
        const msg = this.modoEdicion ? 'actualizada' : 'creada';
        this.finalizarGuardado(`Temporada ${msg} correctamente`);
      },
      error: (err) => {
        // Capturamos el mensaje que enviamos desde el BadRequest del C#
        this.mensajeError = err.error?.message || 'Ocurrió un error inesperado';

        // Opcional: limpiar el mensaje de error después de 5 segundos
        setTimeout(() => this.mensajeError = '', 5000);
      }
    });
  }

  finalizarGuardado(mensaje: string) {
    this.cargar();
    this.cerrarModal(); // Cierra el modal de formulario

    this.mensajeExito = mensaje;

    // Limpia el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  // Agrega estas variables
  mostrarConfirmarEliminar = false;
  idAEliminar: number | null = null;

  // Reemplaza tu función eliminar actual
  eliminar(id: number) {
    this.idAEliminar = id;
    this.mostrarConfirmarEliminar = true;
  }

  cancelarEliminar() {
    this.mostrarConfirmarEliminar = false;
    this.idAEliminar = null;
  }

  confirmarEliminar() {
    if (this.idAEliminar !== null) {
      this.useCase.delete(this.idAEliminar).subscribe(() => {
        this.cargar();
        this.cancelarEliminar();

        // Usamos la misma lógica de tiempo
        this.mensajeExito = 'Temporada eliminada correctamente';
        setTimeout(() => this.mensajeExito = '', 3000);
      });
    }
  }
}