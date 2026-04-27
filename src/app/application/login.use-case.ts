import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../infrastructure/dtos/login-request';
import { LoginResponse } from '../infrastructure/dtos/login-response';
import { AuthRepository } from '../domain/interfaces/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(data: LoginRequest): Observable<LoginResponse> {
    return this.authRepository.login(data);
  }
}