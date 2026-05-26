import { Observable } from 'rxjs';
import { AuditLog } from '../entities/audit-log.entity';

export abstract class AuditLogRepository {
  abstract getAll(): Observable<AuditLog[]>;
}