import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRepository } from '../domain/interfaces/dashboard.repository';
import { DashboardMetrics } from '../domain/entities/dashboard.entity';

@Injectable({
  providedIn: 'root'
})
export class GetDashboardMetricsUseCase {
  private readonly dashboardRepo = inject(DashboardRepository);

  execute(): Observable<DashboardMetrics> {
    return this.dashboardRepo.getMetrics();
  }
}