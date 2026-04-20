import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicidadUseCase } from '../application/publicidad.use-case';
import { Publicidad } from '../domain/entities/publicidad.entity';

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.css'
})
export class PublicidadComponent implements OnInit {
  private readonly publicidadUseCase = inject(PublicidadUseCase);
  
  publicidades: Publicidad[] = [];
  publicidadesVisibles: Publicidad[] = [];

  currentPage = 0;
  itemsPerPage = 3;

  mostrarModal = false;
  modoEdicion = false;

  mensajeError = '';
  mensajeExito = '';

  publicidadForm: Publicidad = this.getPublicidadVacia();

  ngOnInit(): void {
    this.cargarPublicidades();
  }

  getPublicidadVacia(): Publicidad {
    return {
      id: 0,
      imageUrl: '',
      link: '',
      estado: true,
      orden: 0
    };
  }

  cargarPublicidades(): void {
    this.publicidadUseCase.getAll().subscribe({
      next: (data) => {
        this.publicidades = data;
        this.actualizarPublicidadesVisibles();
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Error al cargar publicidades.';
      }
    });
  }

  actualizarPublicidadesVisibles(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.publicidadesVisibles = this.publicidades.slice(start, end);
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.publicidades.length / this.itemsPerPage) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.actualizarPublicidadesVisibles();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.actualizarPublicidadesVisibles();
    }
  }

  abrirAgregar(): void {
    this.modoEdicion = false;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.publicidadForm = this.getPublicidadVacia();
    this.mostrarModal = true;
  }

  abrirEditar(publicidad: Publicidad): void {
    this.modoEdicion = true;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.publicidadForm = { ...publicidad };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.publicidadForm = this.getPublicidadVacia();
    this.mensajeError = '';
  }

  guardar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.publicidadForm.imageUrl || !this.publicidadForm.imageUrl.trim()) {
      this.mensajeError = 'La imagen es obligatoria.';
      return;
    }

    if (!this.publicidadForm.link || !this.publicidadForm.link.trim()) {
      this.mensajeError = 'El enlace es obligatorio.';
      return;
    }

    if (this.publicidadForm.orden < 0) {
      this.mensajeError = 'El orden no puede ser negativo.';
      return;
    }

    if (this.publicidadForm.link && !this.publicidadForm.link.trim()) {
      this.publicidadForm.link = '';
    }

    if (this.modoEdicion) {
      this.publicidadUseCase.update(this.publicidadForm.id, this.publicidadForm).subscribe({
        next: (resp) => {
          this.mensajeExito = resp?.mensaje || 'Publicidad actualizada correctamente.';
          this.cargarPublicidades();
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          this.mensajeError = err?.error?.mensaje || 'Error al actualizar publicidad.';
        }
      });
    } else {
      this.publicidadUseCase.create(this.publicidadForm).subscribe({
        next: () => {
          this.mensajeExito = 'Publicidad agregada correctamente.';
          this.cargarPublicidades();
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          this.mensajeError = err?.error?.mensaje || 'Error al crear publicidad.';
        }
      });
    }
  }

  eliminar(id: number): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    const confirmado = confirm('¿Deseas eliminar esta publicidad?');
    if (!confirmado) return;

    this.publicidadUseCase.delete(id).subscribe({
      next: (resp) => {
        this.mensajeExito = resp?.mensaje || 'Publicidad eliminada correctamente.';
        this.cargarPublicidades();

        const maxPage = Math.ceil(Math.max(this.publicidades.length - 1, 1) / this.itemsPerPage) - 1;
        if (this.currentPage > maxPage) {
          this.currentPage = Math.max(maxPage, 0);
        }
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = err?.error?.mensaje || 'Error al eliminar publicidad.';
      }
    });
  }
}