import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export type UploadCarpeta = 'tipos' | 'habitaciones' | 'ofertas' | 'publicidad' | 'facilidades' | 'sitio';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File, carpeta: UploadCarpeta = 'general' as any) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ url: string }>(`${this.apiUrl}?carpeta=${carpeta}`, formData);
  }
}
