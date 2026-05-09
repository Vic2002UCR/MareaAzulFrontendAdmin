import { Injectable } from "@angular/core";
import { Hotel } from "../domain/entities/hotel.entity";
import { HotelRepository } from "../domain/interfaces/hotel.repository";

@Injectable({ providedIn: 'root' })
export class CreateHotelUseCase {

  constructor(
    private repo: HotelRepository
  ) {}

  execute(hotel: Hotel) {
    return this.repo.createHotel(hotel);
  }
}