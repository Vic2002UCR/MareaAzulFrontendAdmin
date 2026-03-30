import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../../domain/entities/hotel.entity';
import { HotelRepository } from '../../domain/interfaces/hotel.repository';

@Injectable()
export class HotelRemoteRepository implements HotelRepository {
  constructor(private http: HttpClient) {}

  getHotel(): Observable<Hotel> {
    return this.http.get<Hotel>('/data/hotel.json');
  }
}