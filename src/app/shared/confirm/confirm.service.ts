import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  visible = false;
  message = '';

  private confirmCallback!: () => void;

  open(message: string, onConfirm: () => void): void {
    this.message = message;
    this.visible = true;
    this.confirmCallback = onConfirm;
  }

  confirm(): void {
    this.visible = false;

    if (this.confirmCallback) {
      this.confirmCallback();
    }
  }

  cancel(): void {
    this.visible = false;
  }
}