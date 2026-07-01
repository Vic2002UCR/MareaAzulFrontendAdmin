import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

// 1. IMPORTA LOS ELEMENTOS REQUERIDOS DE CHART.JS
import {
  Chart,
  registerables
} from 'chart.js';

import { GetDashboardMetricsUseCase } from '../application/get-dashboard-metrics.use-case';
import { DashboardMetrics } from '../domain/entities/dashboard.entity';
import { ChartConfiguration, ChartType } from 'chart.js';

// 2. REGISTRA LOS ELEMENTOS GLOBALMENTE ANTES DEL COMPONENTE
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly getMetricsUseCase = inject(GetDashboardMetricsUseCase);

  metrics?: DashboardMetrics;
  cargando = true;

  public lineChartData?: ChartConfiguration['data'];
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartType: ChartType = 'line';

  public doughnutChartData?: ChartConfiguration<'doughnut'>['data'];
  public doughnutChartType: 'doughnut' = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: { size: 14 }
        }
      }
    }
  };

  public reservasChartData?: ChartConfiguration<'doughnut'>['data'];
  public reservasChartType: 'doughnut' = 'doughnut';

  public reservasChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: { size: 14 }
        }
      }
    }
  };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.getMetricsUseCase.execute().subscribe({
      next: (data) => {
        this.metrics = data;

        this.lineChartData = {
          labels: [...data.meses],
          datasets: [
            {

              data: [...data.ingresosMensuales],
              label: 'Ingresos Mensuales (₡)',
              backgroundColor: 'rgba(223, 169, 116, 0.2)',
              borderColor: 'rgba(223, 169, 116, 1)',
              pointBackgroundColor: 'rgba(223, 169, 116, 1)',
              fill: 'origin',
            }
          ]
        };

        this.doughnutChartData = {
          labels: ['Ocupadas', 'Disponibles'],
          datasets: [
            {
              data: [data.habitacionesOcupadas, data.habitacionesDisponibles],
              backgroundColor: ['#ec5945', '#e9e596c2']
            }
          ]
        };

        this.reservasChartData = {
          labels: ['Confirmadas', 'Canceladas'],
          datasets: [
            {
              data: [
                data.reservasConfirmadas,
                data.reservasCanceladas
              ],
              backgroundColor: ['#4caf50', '#ec5945']
            }
          ]
        };

        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}