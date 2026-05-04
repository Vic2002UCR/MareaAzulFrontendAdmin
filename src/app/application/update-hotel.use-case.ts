import { Injectable } from "@angular/core";
import { HotelRemoteRepository } from "../infrastructure/repositories/hotel-remote.repository";
import { Hotel } from "../domain/entities/hotel.entity";
import { HotelRepository } from "../domain/interfaces/hotel.repository";

@Injectable({ providedIn: 'root' })
export class UpdateHotelUseCase {
  constructor(private repo: HotelRepository) {}

  execute(hotel: Hotel) {
    return this.repo.updateHotel(hotel);
  }
}