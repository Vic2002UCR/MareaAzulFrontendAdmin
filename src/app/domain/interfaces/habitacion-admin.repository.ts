import { Observable } from 'rxjs';

export interface HabitacionAdmin {
  idHabitacion: number;
  numeroHabitacion: string;
  tipo: number;
  estado: boolean;
}

export abstract class HabitacionAdminRepository {
  abstract getPorTipo(tipoId: number): Observable<HabitacionAdmin[]>;
  abstract getSiguienteNumero(): Observable<{ numero: string }>;
  abstract agregar(numeroHabitacion: string, tipoId: number): Observable<void>;
  abstract eliminar(id: number): Observable<void>;
  abstract toggleEstado(id: number): Observable<void>;
}
