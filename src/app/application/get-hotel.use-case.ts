import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../domain/entities/hotel.entity';
import { HotelRepository } from '../domain/interfaces/hotel.repository';

@Injectable({
  providedIn: 'root'
})
export class GetHotelUseCase {
  private readonly hotelRepository = inject(HotelRepository);

  execute(): Observable<Hotel> {
    return this.hotelRepository.getHotel();
  }
}