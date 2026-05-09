import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Oferta } from "../domain/entities/oferta.entity";
import { GetOfertasUseCase } from "../application/get-ofertas.use-case";
import { UpdateOfertaUseCase } from "../application/update-oferta.use-case";
import { CreateOfertaUseCase } from "../application/create-oferta.use-case";
import { UploadService } from "../infrastructure/services/upload.service";
import { AlertComponent } from "../shared/alerts/alert/alert.component";
import { AlertService } from "../shared/alerts/alert/alert.service";
import { ConfirmService } from "../shared/confirm/confirm.service";

@Component({
  selector: "app-ofertas",
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    DatePipe,
    NgClass,
    AlertComponent,
  ],
  templateUrl: "./ofertas.component.html",
  styleUrls: ["./ofertas.component.css"],
})
export class OfertasComponent implements OnInit {

  mostrarModal = false;

  ofertas: Oferta[] = [];

  ofertasActivas: Oferta[] = [];
  ofertasInactivas: Oferta[] = [];

  nuevaOferta: Oferta = this.getEmptyOferta();

  mostrarConfirmacion = false;
  ofertaSeleccionada!: Oferta;

  accion: "activar" | "desactivar" = "activar";

  selectedFile!: File;

  constructor(
    private createOfertaUseCase: CreateOfertaUseCase,
    private getOfertasUseCase: GetOfertasUseCase,
    private updateOfertaUseCase: UpdateOfertaUseCase,
    private uploadService: UploadService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas() {

    this.getOfertasUseCase.execute().subscribe({

      next: (data) => {

        this.ofertasActivas = data.filter((o) => o.estado);

        this.ofertasInactivas = data.filter((o) => !o.estado);
      },

      error: () => {

        this.alertService.error(
          "Error cargando las ofertas"
        );
      },
    });
  }

  agregar() {

    this.nuevaOferta = this.getEmptyOferta();

    this.mostrarModal = true;
  }

  cerrarModal() {

    this.mostrarModal = false;

    this.resetFormulario();
  }

  cancelarEdicion() {

  this.confirmService.open(
    "¿Desea cancelar los cambios realizados?",
    () => {

      this.cerrarModal();

      this.alertService.info(
        "Cambios cancelados"
      );
    }
  );
}

  validarFormulario(): boolean {

    if (!this.nuevaOferta.nombre?.trim()) {

      this.alertService.warning(
        "El nombre es obligatorio"
      );

      return false;
    }

    if (!this.nuevaOferta.descripcion?.trim()) {

      this.alertService.warning(
        "La descripción es obligatoria"
      );

      return false;
    }

    if (!this.nuevaOferta.imageUrl?.trim()) {

      this.alertService.warning(
        "Debe subir una imagen"
      );

      return false;
    }

    if (
      this.nuevaOferta.estado === null ||
      this.nuevaOferta.estado === undefined
    ) {

      this.alertService.warning(
        "El estado es obligatorio"
      );

      return false;
    }

    if (
      this.nuevaOferta.descuento === null ||
      this.nuevaOferta.descuento === undefined
    ) {

      this.alertService.warning(
        "El descuento es obligatorio"
      );

      return false;
    }

    if (
      this.nuevaOferta.descuento <= 0 ||
      this.nuevaOferta.descuento >= 100
    ) {

      this.alertService.warning(
        "El descuento debe ser mayor a 0 y menor a 100"
      );

      return false;
    }

    if (!this.nuevaOferta.fechaInicio) {

      this.alertService.warning(
        "La fecha de inicio es obligatoria"
      );

      return false;
    }

    if (!this.nuevaOferta.fechaFin) {

      this.alertService.warning(
        "La fecha de fin es obligatoria"
      );

      return false;
    }

    return true;
  }

  guardarOferta() {

    if (!this.validarFormulario()) {
      return;
    }

    // EDITAR
    if (this.nuevaOferta.id) {

      this.updateOfertaUseCase
        .execute(this.nuevaOferta.id, this.nuevaOferta)
        .subscribe({

          next: () => {

            this.cargarOfertas();

            this.cerrarModal();

            this.alertService.success(
              "Oferta actualizada correctamente"
            );
          },

          error: () => {

            this.alertService.error(
              "Error actualizando la oferta"
            );
          },
        });

    }

    // CREAR
    else {

      this.createOfertaUseCase
        .execute(this.nuevaOferta)
        .subscribe({

          next: () => {

            this.cargarOfertas();

            this.cerrarModal();

            this.alertService.success(
              "Oferta creada correctamente"
            );
          },

          error: () => {

            this.alertService.error(
              "Error creando la oferta"
            );
          },
        });
    }
  }

  editar(oferta: Oferta) {

    this.nuevaOferta = { ...oferta };

    this.mostrarModal = true;
  }

  cambiarEstado(oferta: Oferta) {

    this.ofertaSeleccionada = oferta;

    this.accion = oferta.estado
      ? "desactivar"
      : "activar";

    this.mostrarConfirmacion = true;
  }

  confirmar() {

    const actualizada: Oferta = {

      ...this.ofertaSeleccionada,

      estado: this.accion === "activar",
    };

    this.updateOfertaUseCase
      .execute(this.ofertaSeleccionada.id!, actualizada)
      .subscribe({

        next: () => {

          this.cargarOfertas();

          this.mostrarConfirmacion = false;

          this.alertService.success(
            this.accion === "activar"
              ? "Oferta activada correctamente"
              : "Oferta desactivada correctamente"
          );
        },

        error: () => {

          this.alertService.error(
            "Error cambiando el estado de la oferta"
          );
        },
      });
  }

  cancelar() {

    this.mostrarConfirmacion = false;
  }

  resetFormulario() {

    this.nuevaOferta = this.getEmptyOferta();
  }

  private getEmptyOferta(): Oferta {

    return {

      nombre: "",

      descripcion: "",

      imageUrl: "",

      descuento: null,

      fechaInicio: "",

      fechaFin: "",

      estado: true,
    };
  }

  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0];

    if (!this.selectedFile) {

      this.alertService.warning(
        "Debe seleccionar una imagen"
      );

      return;
    }

    this.uploadService
      .uploadImage(this.selectedFile, "ofertas")
      .subscribe({

        next: (res) => {

          this.nuevaOferta.imageUrl = res.url;

          this.alertService.success(
            "Imagen subida correctamente"
          );
        },

        error: () => {

          this.alertService.error(
            "Error subiendo la imagen"
          );
        },
      });
  }
}