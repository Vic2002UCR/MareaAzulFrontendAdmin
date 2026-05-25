import { Observable } from 'rxjs';
import { DashboardMetrics } from '../entities/dashboard.entity';

export abstract class DashboardRepository {
  abstract getMetrics(): Observable<DashboardMetrics>;
}