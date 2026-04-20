import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent {

  @ViewChild('contenedorOfertas') contenedor!: ElementRef;

  mostrarModal = false;

  ofertas = [
    { id: 1, titulo: 'Oferta 1' },
    { id: 2, titulo: 'Oferta 2' },
    { id: 3, titulo: 'Oferta 3' }
  ];

  nuevaOferta = {
    titulo: '',
    descripcion: '',
    precio: 0
  };

  agregar() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.resetFormulario();
  }

  guardarOferta() {
    const nueva = {
      id: Date.now(),
      ...this.nuevaOferta
    };

    this.ofertas.push(nueva);
    this.cerrarModal();
  }

  editar(oferta: any) {
    console.log('Editar', oferta);
  }

  eliminar(id: number) {
    this.ofertas = this.ofertas.filter(o => o.id !== id);
  }

  scrollIzq() {
    this.contenedor.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollDer() {
    this.contenedor.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }

  resetFormulario() {
    this.nuevaOferta = {
      titulo: '',
      descripcion: '',
      precio: 0
    };
  }
}