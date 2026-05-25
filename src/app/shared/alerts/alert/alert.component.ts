import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}