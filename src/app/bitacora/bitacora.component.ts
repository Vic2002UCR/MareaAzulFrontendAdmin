import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLog } from '../domain/entities/audit-log.entity';
import { GetAuditLogUseCase } from '../application/get-auditlog.use-case';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css'
})
export class BitacoraComponent implements OnInit {

  logs: AuditLog[] = [];
  logsFiltrados: AuditLog[] = [];
  usuarios: string[] = [];

  filtroUsuario = '';
  filtroOperacion = '';
  fechaInicio = '';
  fechaFin = '';

  constructor(private getAuditLogUseCase: GetAuditLogUseCase) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.getAuditLogUseCase.execute().subscribe({
      next: (data) => {
        this.logs = data;
        this.logsFiltrados = data;
        this.usuarios = [...new Set(this.logs.map(log => log.adminNombre))];
      }
    });
  }

  filtrar() {

    this.logsFiltrados = this.logs.filter(log => {

      const cumpleUsuario =
        !this.filtroUsuario || log.adminNombre === this.filtroUsuario;

     const cumpleOperacion =
  !this.filtroOperacion || log.operacion === this.filtroOperacion;
      const fecha = new Date(log.fechaHora);

      const cumpleInicio =
        !this.fechaInicio || fecha >= new Date(this.fechaInicio);

      const cumpleFin =
        !this.fechaFin || fecha <= new Date(this.fechaFin + 'T23:59:59');

      return (
        cumpleUsuario &&
        cumpleOperacion &&
        cumpleInicio &&
        cumpleFin
      );
    });
  }

  limpiar() {

    this.filtroUsuario = '';
    this.filtroOperacion = '';
    this.fechaInicio = '';
    this.fechaFin = '';

    this.logsFiltrados = [...this.logs];
  }

  validarFechas() {

    if (this.fechaInicio && this.fechaFin) {
      if (this.fechaFin < this.fechaInicio) {
        this.fechaFin = '';
      }
    }
  }
}