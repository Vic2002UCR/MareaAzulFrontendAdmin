import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PublicidadUseCase } from '../application/publicidad.use-case';
import { Publicidad } from '../domain/entities/publicidad.entity';
import { UploadService } from '../infrastructure/services/upload.service';
import { ConfirmService } from '../shared/confirm/confirm.service';
import { AlertService } from '../shared/alerts/alert/alert.service';

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.css'
})
export class PublicidadComponent implements OnInit {
  private readonly publicidadUseCase = inject(PublicidadUseCase);
  private readonly uploadService = inject(UploadService);
  private readonly alertService = inject(AlertService);
  private readonly confirmService = inject(ConfirmService);

  publicidades: Publicidad[] = [];
  publicidadesVisibles: Publicidad[] = [];

  currentPage = 0;
  itemsPerPage = 3;

  mostrarModal = false;
  modoEdicion = false;

  mensajeError = '';
  mensajeExito = '';

  publicidadForm: Publicidad = this.getPublicidadVacia();
  selectedFile?: File;

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
        this.alertService.error('Error al cargar publicidades.');
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

    const hayCambios =
      this.publicidadForm.imageUrl.trim() ||
      this.publicidadForm.link.trim()

    if (hayCambios) {

      this.confirmService.open(
        '¿Desea deshacer los cambios?',
        () => {
          this.cerrarModalSinConfirmar();
        }
      );

      return;
    }

    this.cerrarModalSinConfirmar();
  }

  cerrarModalSinConfirmar(mostrarAlerta = true): void {
    this.mostrarModal = false;
    this.publicidadForm = this.getPublicidadVacia();
    this.mensajeError = '';
    this.selectedFile = undefined;

    if (mostrarAlerta) {
      this.alertService.warning('Cambios descartados.');
    }
  }

  guardar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.publicidadForm.imageUrl.trim() && !this.publicidadForm.link.trim()) {
      this.alertService.warning('Todos los campos son obligatorios.');
      return;
    }

    if (!this.publicidadForm.imageUrl || !this.publicidadForm.imageUrl.trim()) {
      this.alertService.warning('La imagen es obligatoria.');
      return;
    }

    if (!this.publicidadForm.link || !this.publicidadForm.link.trim()) {
      this.alertService.warning('El enlace es obligatorio.');
      return;
    }

    if (this.publicidadForm.orden < 0) {
      this.alertService.warning('El orden no puede ser negativo.');
      return;
    }

    if (this.publicidadForm.link && !this.publicidadForm.link.trim()) {
      this.publicidadForm.link = '';
    }

    if (this.modoEdicion) {
      this.publicidadUseCase.update(this.publicidadForm.id, this.publicidadForm).subscribe({
        next: () => {
          this.alertService.success('Publicidad actualizada correctamente.');
          this.cargarPublicidades();
          this.cerrarModalSinConfirmar(false);
        },
        error: (err) => {
          console.error(err);
          this.alertService.error(err?.error?.mensaje || 'Error al actualizar publicidad.');
        }
      });
    } else {
      this.publicidadUseCase.create(this.publicidadForm).subscribe({
        next: () => {
          this.alertService.success('Publicidad agregada correctamente.');
          this.cargarPublicidades();
          this.cerrarModalSinConfirmar(false);
        },
        error: (err) => {
          console.error(err);
          this.alertService.error(err?.error?.mensaje || 'Error al crear publicidad.');
        }
      });
    }
  }

  eliminar(id: number): void {

    this.mensajeError = '';
    this.mensajeExito = '';

    this.confirmService.open(
      '¿Deseas eliminar esta publicidad?',

      () => {

        this.publicidadUseCase.delete(id).subscribe({

          next: (resp) => {

            this.alertService.success(
              resp?.mensaje || 'Publicidad eliminada correctamente.'
            );

            this.cargarPublicidades();

            const maxPage =
              Math.ceil(
                Math.max(this.publicidades.length - 1, 1) / this.itemsPerPage
              ) - 1;

            if (this.currentPage > maxPage) {
              this.currentPage = Math.max(maxPage, 0);
            }
          },

          error: (err: any) => {
            console.error(err);

            this.alertService.error(
              err?.error?.mensaje || 'Error al eliminar publicidad.'
            );
          }

        });

      },

      () => {
        this.alertService.info(
          'No se realizaron cambios.'
        );
      }

    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(this.selectedFile.type)) {
      this.alertService.warning('El archivo seleccionado no es una imagen válida.');
      input.value = '';
      return;
    }

    this.uploadService.uploadImage(this.selectedFile, 'publicidad').subscribe({
      next: (res) => {
        this.publicidadForm.imageUrl = res.url;
        this.mensajeError = '';
      },
      error: (err) => {
        console.error(err);
        this.alertService.error('Error al subir la imagen.');
      }
    });


  }
}