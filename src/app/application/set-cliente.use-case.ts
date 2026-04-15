import { inject, Injectable } from "@angular/core";
import { Cliente } from "../domain/entities/cliente.entity";
import { ClienteRepository } from "../domain/interfaces/cliente.repository";

@Injectable({
  providedIn: 'root'
})
export class SetClienteUseCase {
  private readonly repository = inject(ClienteRepository);

  execute(cliente: Cliente): void {
    this.repository.setCliente(cliente);
  }
}