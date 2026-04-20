import { Observable } from 'rxjs';
import { Cliente } from '../entities/cliente.entity';

export abstract class ClienteRepository {
  abstract getCliente(): Observable<Cliente[]>;
  abstract setCliente(cliente:Cliente):void;
}