import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hotel } from "../../domain/entities/hotel.entity";
import { HotelRepository } from "../../domain/interfaces/hotel.repository";

@Injectable()
export class HotelTestRepository implements HotelRepository {
  getHotel(): Observable<Hotel> {
    const hotel: Hotel = {
      nombre: "Marea Azul",
      direccion: "En algún lugar de CR",
      telefono: "(12) 345 67890",
      codigoPostal: "12345",
      email: "info.hotel@gmail.com",
      logo: "/assets/img/logo.png",
      googleMapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11554.790732567133!2d-85.01553906707292!3d9.730096245160466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa1d583087a8411%3A0x4e55ef117a4fdba6!2sBarcel%C3%B3%20Tambor%20-%20All%20Inclusive!5e0!3m2!1ses!2scr!4v1774719873392!5m2!1ses!2scr",
      homeImgUrl: "/assets/img/hero/hero-3.jpg",
      homeDescription:
        "Bienvenido a Hotel Marea Azul, un espacio ideal para descansar y disfrutar de una experiencia cómoda y con vista al mar.",
      sobreNosotros:
        "En Hotel Marea Azul nos enfocamos en brindar comodidad, atención cercana y una experiencia agradable para todos nuestros huéspedes.",
    };

    return of(hotel);
  }

  updateHotel(hotel: Hotel): Observable<void> {
    console.log("Mock update:", hotel); // opcional
    return of(); //devuelve un Observable vacío
  }
}
