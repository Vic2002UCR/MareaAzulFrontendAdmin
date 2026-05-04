import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginUseCase } from '../application/login.use-case';
import { LoginRequest } from '../infrastructure/dtos/login-request';
import { LoginResponse } from '../infrastructure/dtos/login-response';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule,NgIf],
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
  ) { }

  login() {
    this.errorMessage = '';
    this.loading = true;

    const request: LoginRequest = {
      correo: this.correo,
      contrasena: this.contrasena,
      deviceId: this.getDeviceId(),
      deviceName: 'Web Browser'
    };

    this.loginUseCase.execute(request).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('accessToken', response.tokens.accessToken);
        localStorage.setItem('refreshToken', response.tokens.refreshToken);

        localStorage.setItem('admin', JSON.stringify(response.admin));

        this.loading = false;
        this.router.navigate(['/sitio']);
      },
      error: (error) => {
        this.loading = false;

        const message = error?.error?.message || 'Credenciales iválidos';

        alert(message);

        console.error('Error en login', error);
      }
    });
  }

  getDeviceId(): string {
    let deviceId = localStorage.getItem('deviceId');

    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }

    return deviceId;
  }
}