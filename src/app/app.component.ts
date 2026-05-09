import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService, TestResponse } from './infrastructure/services/api.service';
import { AlertComponent } from './shared/alerts/alert/alert.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AlertComponent, ConfirmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MareaAzulAdmin';
  showHeader = true;

  message = '';

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showHeader = this.router.url !== '/inicio';
      });
  }

  ngOnInit(): void {
    this.apiService.getTest().subscribe({
      next: (response: TestResponse) => {
        this.message = response.message;
      },
      error: (error) => {
        console.error('Error al conectar con la API', error);
      }
    });
  }

  logout() {
  // elimina tokens
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('admin');
  localStorage.removeItem('deviceId'); // opcional

  this.router.navigate(['/inicio']);
}
}