import { Observable } from "rxjs";
import { Hotel } from "../entities/hotel.entity";

export abstract class HotelRepository {
  abstract getHotel(): Observable<Hotel>;

  abstract updateHotel(hotel: Hotel): Observable<void>;
}
