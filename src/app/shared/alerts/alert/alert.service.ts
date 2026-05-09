import { Injectable, signal } from '@angular/core';
import { Alert } from './alert.types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = signal<Alert | null>(null);

  show(alert: Alert): void {
    this.alert.set(alert);

    setTimeout(() => {
      this.clear();
    }, 10000);
  }

  success(message: string, title = 'Operación exitosa'): void {
    this.show({ type: 'success', title, message });
  }

  error(message: string, title = 'Error'): void {
    this.show({ type: 'error', title, message });
  }

  warning(message: string, title = 'Advertencia'): void {
    this.show({ type: 'warning', title, message });
  }

  info(message: string, title = 'Información'): void {
    this.show({ type: 'info', title, message });
  }

  clear(): void {
    this.alert.set(null);
  }
}