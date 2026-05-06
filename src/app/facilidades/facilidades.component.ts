import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Facilidad } from '../domain/entities/facilidad.entity';
import { FacilidadUseCase } from '../application/facilidades.use-case';
import { UploadService } from '../infrastructure/services/upload.service';

@Component({
  selector: 'app-facilidades',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './facilidades.component.html',
  styleUrls: ['./facilidades.component.css']
})
export class FacilidadesComponent implements OnInit {
  private readonly facilidadUseCase = inject(FacilidadUseCase);
  private readonly uploadService = inject(UploadService);

  facilidades: Facilidad[] = [];
  facilidadesVisibles: Facilidad[] = [];

  currentPage = 0;
  itemsPerPage = 3;

  mostrarModal = false;
  modoEdicion = false;

  mensajeError = '';
  mensajeExito = '';

  facilidadForm: Facilidad = this.getFacilidadVacia();
  selectedFile?: File;

  ngOnInit(): void {
    this.cargarFacilidades();
  }

  getFacilidadVacia(): Facilidad {
    return {
      id: 0,
      nombre: '',
      descripcion: '',
      imageUrl: ''
    };
  }

  cargarFacilidades(): void {
    this.facilidadUseCase.obtenerTodas().subscribe({
      next: (data: Facilidad[]) => {
        this.facilidades = data;
        this.actualizarFacilidadesVisibles();
      },
      error: (err: unknown) => {
        console.error(err);
        this.mensajeError = 'Error al cargar facilidades.';
      }
    });
  }

  actualizarFacilidadesVisibles(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.facilidadesVisibles = this.facilidades.slice(start, end);
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.facilidades.length / this.itemsPerPage) - 1;

    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.actualizarFacilidadesVisibles();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.actualizarFacilidadesVisibles();
    }
  }

  abrirAgregar(): void {
    this.modoEdicion = false;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.facilidadForm = this.getFacilidadVacia();
    this.mostrarModal = true;
  }

  abrirEditar(facilidad: Facilidad): void {
    this.modoEdicion = true;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.facilidadForm = { ...facilidad };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    const hayCambios =
      this.facilidadForm.nombre.trim() ||
      this.facilidadForm.descripcion.trim() ||
      this.facilidadForm.imageUrl.trim();

    if (hayCambios && !confirm('¿Desea deshacer los cambios?')) {
      return;
    }

    this.mostrarModal = false;
    this.facilidadForm = this.getFacilidadVacia();
    this.mensajeError = '';
    this.selectedFile = undefined;
  }

  guardar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.facilidadForm.nombre.trim()) {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }

    if (!this.facilidadForm.descripcion.trim()) {
      this.mensajeError = 'La descripción es obligatoria.';
      return;
    }

    if (!this.facilidadForm.imageUrl.trim()) {
      this.mensajeError = 'La imagen es obligatoria.';
      return;
    }

    if (this.modoEdicion) {
      this.facilidadUseCase.actualizar(this.facilidadForm.id, this.facilidadForm).subscribe({
        next: (resp) => {
          this.mensajeExito = resp?.mensaje || 'Facilidad actualizada correctamente.';
          this.cargarFacilidades();
          this.mostrarModal = false;
          this.facilidadForm = this.getFacilidadVacia();
        },
        error: (err: any) => {
          console.error(err);
          this.mensajeError = err?.error?.mensaje || 'Error al actualizar facilidad.';
        }
      });
    } else {
      this.facilidadUseCase.crear(this.facilidadForm).subscribe({
        next: () => {
          this.mensajeExito = 'Facilidad agregada correctamente.';
          this.cargarFacilidades();
          this.mostrarModal = false;
          this.facilidadForm = this.getFacilidadVacia();
        },
        error: (err: any) => {
          console.error(err);
          this.mensajeError = err?.error?.mensaje || 'Error al crear facilidad.';
        }
      });
    }
  }

  eliminar(id: number): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!confirm('¿Deseas eliminar esta facilidad?')) return;

    this.facilidadUseCase.eliminar(id).subscribe({
      next: (resp) => {
        this.mensajeExito = resp?.mensaje || 'Facilidad eliminada correctamente.';
        this.cargarFacilidades();

        const maxPage = Math.ceil(Math.max(this.facilidades.length - 1, 1) / this.itemsPerPage) - 1;

        if (this.currentPage > maxPage) {
          this.currentPage = Math.max(maxPage, 0);
        }
      },
      error: (err: any) => {
        console.error(err);
        this.mensajeError = err?.error?.mensaje || 'Error al eliminar facilidad.';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    this.uploadService.uploadImage(this.selectedFile).subscribe({
      next: (res) => {
        this.facilidadForm.imageUrl = res.url;
        this.mensajeError = '';
      },
      error: (err: unknown) => {
        console.error(err);
        this.mensajeError = 'Error al subir la imagen.';
      }
    });
  }
}