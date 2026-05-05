import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Hotel } from '../domain/entities/hotel.entity';
import { GetHotelUseCase } from '../application/get-hotel.use-case';
import { UpdateHotelUseCase } from '../application/update-hotel.use-case';
import { UploadService } from '../infrastructure/services/upload.service';

@Component({
  selector: 'app-sitio',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './sitio.component.html',
  styleUrl: './sitio.component.css'
})
export class SitioComponent implements OnInit {
  seccion: 'sitio' | 'sobreNosotros' | 'comoLlegar' | 'contacto' | 'facilidades' = 'sitio';
  hotel!: Hotel;

  selectedFile!: File;

  mostrarModal: boolean = false;

  constructor(
    private getHotelUseCase: GetHotelUseCase,
    private updateHotelUseCase: UpdateHotelUseCase,
    private uploadService:UploadService
  ) {}

  ngOnInit(): void {
    this.getHotelUseCase.execute().subscribe(res => {
      this.hotel = res;
    });
  }

  guardar() {
    console.log(this.hotel.homeImgUrl);
    this.updateHotelUseCase.execute(this.hotel)
      .subscribe(() => {
        this.mostrarModal = true;
      });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
  
  // Imagen
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
  if (!this.selectedFile) return;

  this.uploadService.uploadImage(this.selectedFile)
    .subscribe(res => {
      this.hotel.homeImgUrl = res.url; 
    });
}
}