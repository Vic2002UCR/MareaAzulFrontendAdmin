import { inject, Injectable } from "@angular/core";
import { Observable, combineLatest, map } from 'rxjs';
import { HabitacionRepository } from "../domain/interfaces/habitacion.repository";
import { TemporadaRepository } from "../domain/interfaces/temporada.repository";
import { TipoHabitacionRepository } from "../domain/interfaces/tipo-habitacion.repository";
import { Habitacion } from "../domain/entities/habitacion.entity";

@Injectable({
  providedIn: 'root'
})
export class GetHabitacionUseCase {

  private readonly habitacionRepo = inject(HabitacionRepository);
  private readonly temporadaRepo = inject(TemporadaRepository);
  private readonly tipoHabitacionRepo = inject(TipoHabitacionRepository);

  execute(fechaEntrada: Date, fechaSalida: Date): Observable<any[]> {

    return combineLatest([
      this.habitacionRepo.getHabitacion(),
      this.temporadaRepo.getAll(),
      this.tipoHabitacionRepo.getTiposHabitacion()
    ]).pipe(
      map(([habitaciones, temporadas, tipos]) => {

        return habitaciones.map(habitacion => {

          // buscar el tipo de habitación
          const tipo = tipos.find(t => t.id === habitacion.tipo);

          let precioBase = tipo?.tarifa || 0;
          let precioFinal = precioBase;

          // buscar temporada
          const temporada = temporadas.find(t => {
            const inicio = new Date(t.fechaInicio);
            const fin = new Date(t.fechaFin);

            return fechaEntrada >= inicio && fechaEntrada <= fin;
          });

          if (temporada) {
            precioFinal = precioFinal + (precioFinal * temporada.porcentaje);
          }

          return {
            ...habitacion,
            tipoInfo: tipo,
            precio: precioFinal
          };
        });

      })
    );
  }
}