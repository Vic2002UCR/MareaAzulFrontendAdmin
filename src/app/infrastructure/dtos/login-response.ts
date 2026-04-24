import { Tokens } from '../../domain/entities/tokens';
import { Admin } from '../../domain/entities/admin.entity';

export interface LoginResponse {
  tokens: Tokens;
  admin: Admin;
}