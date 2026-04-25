import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Oferta } from "../domain/entities/oferta.entity";
import { GetOfertasUseCase } from "../application/get-ofertas.use-case";
import { UpdateOfertaUseCase } from "../application/update-oferta.use-case";
import { CreateOfertaUseCase } from "../application/create-oferta.use-case";

@Component({
  selector: "app-ofertas",
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DatePipe, NgClass],
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

  constructor(
    private createOfertaUseCase: CreateOfertaUseCase,
    private getOfertasUseCase: GetOfertasUseCase,
    private updateOfertaUseCase: UpdateOfertaUseCase,
  ) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  // Cargar ofertas desde API
  cargarOfertas() {
    this.getOfertasUseCase.execute().subscribe({
      next: (data) => {
        this.ofertasActivas = data.filter((o) => o.estado);
        this.ofertasInactivas = data.filter((o) => !o.estado);
      },
    });
  }

  // Abrir modal
  agregar() {
    this.nuevaOferta = this.getEmptyOferta();
    this.mostrarModal = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
    this.resetFormulario();
  }

  // Crear o actualizar
  guardarOferta() {
    if (this.nuevaOferta.id) {
      this.updateOfertaUseCase
        .execute(this.nuevaOferta.id, this.nuevaOferta)
        .subscribe(() => {
          this.cargarOfertas();
          this.cerrarModal();
        });
    } else {
      this.createOfertaUseCase.execute(this.nuevaOferta).subscribe(() => {
        this.cargarOfertas();
        this.cerrarModal();
      });
    }
  }

  // Editar
  editar(oferta: Oferta) {
    this.nuevaOferta = { ...oferta };
    this.mostrarModal = true;
  }

  // Eliminar (soft delete)
  cambiarEstado(oferta: Oferta) {
    this.ofertaSeleccionada = oferta;
    this.accion = oferta.estado ? "desactivar" : "activar";
    this.mostrarConfirmacion = true;

    // const actualizada = {
    //   ...oferta,
    //   estado: !oferta.estado,
    // };

    // this.updateOfertaUseCase.execute(oferta.id!, actualizada).subscribe({
    //   next: () => this.cargarOfertas(),
    //   error: (err) => console.error("Error cambiando estado:", err),
    // });
  }

  // Reset formulario
  resetFormulario() {
    this.nuevaOferta = this.getEmptyOferta();
  }

  //Helper limpio
  private getEmptyOferta(): Oferta {
    return {
      nombre: "",
      descripcion: "",
      imageUrl: "",
      descuento: 0,
      fechaInicio: "",
      fechaFin: "",
    };
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
        },
        error: (err) => console.error("Error cambiando estado:", err),
      });
  }

  cancelar() {
    this.mostrarConfirmacion = false;
  }
}
