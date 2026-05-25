import { Component } from '@angular/core';

import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  constructor(public confirmService: ConfirmService) {}
}