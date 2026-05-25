import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardRepository } from '../../domain/interfaces/dashboard.repository';
import { DashboardMetrics } from '../../domain/entities/dashboard.entity';
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardRemoteRepository implements DashboardRepository {
    private apiUrl = `${environment.apiUrl}/Dashboard`;

    constructor(private http: HttpClient) { }

    getMetrics(): Observable<DashboardMetrics> {
        return this.http.get<DashboardMetrics>(`${this.apiUrl}/metrics`);
    }
}