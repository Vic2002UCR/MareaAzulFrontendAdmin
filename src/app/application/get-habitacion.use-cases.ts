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
          const precioBaseNoche = tipo?.tarifa || 0;

          let precioTotalEstancia = 0;

          // Creamos un cursor para recorrer día por día desde la entrada
          let fechaCursor = new Date(fechaEntrada);

          // Clonamos la fecha de salida para la comparación
          const salida = new Date(fechaSalida);

          // Recorremos cada noche de la estancia
          while (fechaCursor < salida) {

            // Buscamos si el día actual del cursor cae en alguna Temporada Alta
            const temporadaAlta = temporadas.find(t => {
              const inicio = new Date(t.fechaInicio);
              const fin = new Date(t.fechaFin);

              // Solo comparamos la fecha sin horas para evitar errores 
              const d = new Date(fechaCursor);
              d.setHours(0, 0, 0, 0);
              inicio.setHours(0, 0, 0, 0);
              fin.setHours(0, 0, 0, 0);

              return d >= inicio && d <= fin;
            });

            // Si es temporada alta, sumamos el porcentaje; si no, sumamos solo el base
            const aumento = temporadaAlta ? (precioBaseNoche * temporadaAlta.porcentaje) : 0;
            precioTotalEstancia += (precioBaseNoche + aumento);

            // Avanzamos el cursor al día siguiente
            fechaCursor.setDate(fechaCursor.getDate() + 1);
          }

          return {
            ...habitacion,
            tipoInfo: tipo,
            precio: precioTotalEstancia // es el total calculado noche a noche
          };
        });

      })
    );
  }
}