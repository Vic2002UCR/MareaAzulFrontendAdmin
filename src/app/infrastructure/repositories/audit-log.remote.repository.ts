import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../domain/entities/audit-log.entity';
import { AuditLogRepository } from '../../domain/interfaces/audit-log.repository';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogRemoteRepository implements AuditLogRepository {

  private readonly apiUrl = `${environment.apiUrl}/AuditLog`;;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }
}