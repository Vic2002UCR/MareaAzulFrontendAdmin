import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditLog } from '../domain/entities/audit-log.entity';
import { AuditLogRepository } from '../domain/interfaces/audit-log.repository';

@Injectable({
  providedIn: 'root'
})
export class GetAuditLogUseCase {

  constructor(
    private repo: AuditLogRepository
  ) {}

  execute(): Observable<AuditLog[]> {
    return this.repo.getAll();
  }
}