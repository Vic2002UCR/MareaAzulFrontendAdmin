import { Observable } from 'rxjs';
import { LoginRequest } from '../../infrastructure/dtos/login-request';
import { LoginResponse } from '../../infrastructure/dtos//login-response';

export abstract class AuthRepository {
  abstract login(data: LoginRequest): Observable<LoginResponse>;
}