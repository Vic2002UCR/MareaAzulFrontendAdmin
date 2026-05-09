import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}