import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hotel } from "../../domain/entities/hotel.entity";
import { HotelRepository } from "../../domain/interfaces/hotel.repository";
import { environment } from "../../../environments/environment";

@Injectable()
export class HotelRemoteRepository implements HotelRepository {
  private apiUrl = `${environment.apiUrl}/hotel`;
  constructor(private http: HttpClient) {}

  getHotel(): Observable<Hotel> {
    return this.http.get<Hotel>(this.apiUrl);
  }

  updateHotel(hotel: Hotel): Observable<void> {
    return this.http.put<void>(this.apiUrl, hotel);
  }
}
