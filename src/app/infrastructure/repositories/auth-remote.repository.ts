import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/interfaces/auth.repository';
import { LoginRequest } from '../../infrastructure/dtos/login-request';
import { LoginResponse } from '../../infrastructure/dtos/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthRemoteRepository implements AuthRepository {

  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, data);
  }
}