import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginUseCase } from '../application/login.use-case';
import { LoginRequest } from '../infrastructure/dtos/login-request';
import { LoginResponse } from '../infrastructure/dtos/login-response';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  correo = '';
  contrasena = '';
  errorMessage = '';
  loading = false;

  constructor(
    private router: Router,
    private loginUseCase: LoginUseCase
  ) {}

login() {
    this.errorMessage = '';
    this.loading = true;

    this.loginUseCase.execute({
      correo: this.correo,
      contrasena: this.contrasena
    }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.loading = false;
        this.router.navigate(['/sitio']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message || 'Credenciales incorrectas';
        console.error('Error en login', error);
      }
    });
  }
}