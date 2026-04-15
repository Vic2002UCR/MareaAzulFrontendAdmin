import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../domain/entities/cliente.entity';
import { ClienteRepository } from '../domain/interfaces/cliente.repository';

@Injectable({
  providedIn: 'root'
})
export class GetClienteUseCase {
  private readonly ClienteRepository = inject(ClienteRepository);

  execute(): Observable<Cliente[]> {
    return this.ClienteRepository.getCliente();
  }
}