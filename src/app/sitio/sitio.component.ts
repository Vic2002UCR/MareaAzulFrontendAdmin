import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Hotel } from "../domain/entities/hotel.entity";
import { GetHotelUseCase } from "../application/get-hotel.use-case";
import { UpdateHotelUseCase } from "../application/update-hotel.use-case";
import { UploadService } from "../infrastructure/services/upload.service";
import { FacilidadesComponent } from "../facilidades/facilidades.component";
import { AlertComponent } from "../shared/alerts/alert/alert.component";
import { CreateHotelUseCase } from "../application/create-hotel.use-case";
import { AlertService } from "../shared/alerts/alert/alert.service";


@Component({
  selector: "app-sitio",
  standalone: true,
  imports: [FormsModule, NgIf, FacilidadesComponent, AlertComponent],
  templateUrl: "./sitio.component.html",
  styleUrl: "./sitio.component.css",
})
export class SitioComponent implements OnInit {
  seccion:
    | "sitio"
    | "sobreNosotros"
    | "comoLlegar"
    | "contacto"
    | "facilidades" = "sitio";

  hotel: Hotel = this.getEmptyHotel();

  selectedFile!: File;

  mostrarModal = false;

  constructor(
    private getHotelUseCase: GetHotelUseCase,
    private updateHotelUseCase: UpdateHotelUseCase,
    private createHotelUseCase: CreateHotelUseCase,
    private uploadService: UploadService,
    private alertService: AlertService,
  ) {}


  ngOnInit(): void {
    this.getHotelUseCase.execute().subscribe({
      next: (res) => {
        this.hotel = res;
      },

      error: (err) => {
        if (err.status === 404) {
          this.hotel = this.getEmptyHotel();
          return;
        }

        console.error(err);

        this.alertService.error("Error cargando la información del sitio");
      },
    });
  }

  guardar() {
    if (!this.validarSeccion()) {
      return;
    }

    if (this.hotel.id) {
      this.updateHotelUseCase.execute(this.hotel).subscribe({
        next: () => {
          this.mostrarModal = true;

          this.alertService.success("Cambios guardados correctamente");
        },

        error: () => {
          this.alertService.error("Error actualizando el sitio");
        },
      });
    }

    else {
      this.createHotelUseCase.execute(this.hotel).subscribe({
        next: (hotelCreado) => {
          this.hotel = hotelCreado;

          this.mostrarModal = true;

          this.alertService.success("Sitio creado correctamente");
        },

        error: () => {
          this.alertService.error("Error creando el sitio");
        },
      });
    }
  }

  validarSeccion(): boolean {
    // HOME
    if (this.seccion === "sitio") {
      if (!this.hotel.homeDescription?.trim()) {
        this.alertService.warning("La descripción del home es obligatoria");

        return false;
      }

      if (!this.hotel.homeImgUrl?.trim()) {
        this.alertService.warning("Debe subir una imagen");

        return false;
      }
    }

    // SOBRE NOSOTROS
    if (this.seccion === "sobreNosotros") {
      if (!this.hotel.sobreNosotros?.trim()) {
        this.alertService.warning("La sección Sobre Nosotros es obligatoria");

        return false;
      }
    }

    // COMO LLEGAR
    if (this.seccion === "comoLlegar") {
      if (!this.hotel.direccion?.trim()) {
        this.alertService.warning("La dirección es obligatoria");

        return false;
      }

      if (!this.hotel.googleMapLink?.trim()) {
        this.alertService.warning("El link de Google Maps es obligatorio");

        return false;
      }
    }

    // CONTACTO
    if (this.seccion === "contacto") {
      if (!this.hotel.email?.trim()) {
        this.alertService.warning("El correo es obligatorio");

        return false;
      }

      if (!this.hotel.telefono?.trim()) {
        this.alertService.warning("El teléfono es obligatorio");

        return false;
      }
    }

    return true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (!this.selectedFile) {
      this.alertService.warning("Debe seleccionar una imagen");

      return;
    }

    this.alertService.info("Imagen seleccionada");
  }

  uploadImage() {
    if (!this.selectedFile) {
      this.alertService.warning("Seleccione una imagen primero");

      return;
    }

    this.uploadService.uploadImage(this.selectedFile, "sitio").subscribe({
      next: (res) => {
        this.hotel.homeImgUrl = res.url;

        this.alertService.success("Imagen subida correctamente");
      },

      error: () => {
        this.alertService.error("Error subiendo la imagen");
      },
    });
  }

  private getEmptyHotel(): Hotel {
    return {
      homeDescription: "",
      homeImgUrl: "",
      sobreNosotros: "",
      direccion: "",
      googleMapLink: "",
      email: "",
      telefono: "",
    };
  }
}
