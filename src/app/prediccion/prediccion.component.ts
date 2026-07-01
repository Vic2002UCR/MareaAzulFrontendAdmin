import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor, NgClass, DecimalPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

import { GetPrediccionUseCase } from '../application/get-prediccion.use-case';
import { ResultadoPrediccion, PrediccionMensual, HistoricoMensual } from '../domain/entities/prediccion.entity';

Chart.register(...registerables);

@Component({
  selector: 'app-prediccion',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, DecimalPipe, BaseChartDirective],
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.css'
})
export class PrediccionComponent implements OnInit {
  private readonly useCase = inject(GetPrediccionUseCase);

  // Estado
  cargando = true;
  error = false;
  mesesSeleccionados = 6;
  opcionesMeses = [3, 6, 9, 12];

  // Datos
  resultado?: ResultadoPrediccion;

  // KPIs calculados
  mesMasAlto?: PrediccionMensual;
  mesMasBajo?: PrediccionMensual;
  totalIngresosEstimados = 0;
  promedioReservas = 0;

  // Chart
  chartData?: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', labels: { color: '#444', font: { size: 13 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            if (ctx.datasetIndex === 2) return `  Banda de confianza (95%): ${Math.round(ctx.parsed.y ?? 0)} reservas`;
            if (ctx.datasetIndex === 3) return '';
            return `  ${ctx.dataset.label}: ${Math.round(ctx.parsed.y ?? 0)}`;
          }
        }
      }
    },
    scales: {
      x: { ticks: { color: '#666', font: { size: 12 } }, grid: { color: 'rgba(0,0,0,0.04)' } },
      y: {
        ticks: { color: '#666', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.06)' },
        title: { display: true, text: 'Reservas', color: '#888' },
        beginAtZero: true
      }
    }
  };

  ngOnInit(): void {
    this.cargar();
  }

  cambiarMeses(n: number): void {
    if (this.mesesSeleccionados === n) return;
    this.mesesSeleccionados = n;
    this.cargando = true;
    this.cargar();
  }

  private cargar(): void {
    this.useCase.execute(this.mesesSeleccionados).subscribe({
      next: (data) => {
        this.resultado = data;
        this.cargando = false;
        this.error = false;

        // Solo hay KPIs y gráfico si el backend devolvió predicciones
        // (requiere >= 5 meses de histórico). Si no, el HTML muestra el aviso
        // con resultado.mensaje. Construir el chart sin datos lanzaba RangeError
        // (Array(-1)) y dejaba la pantalla cargando para siempre.
        if (data.predicciones?.length) {
          this.calcularKpis(data.predicciones);
          this.construirChart(data.historico, data.predicciones);
        }
      },
      error: () => {
        this.cargando = false;
        this.error = true;
      }
    });
  }

  private calcularKpis(predicciones: PrediccionMensual[]): void {
    if (!predicciones.length) return;
    this.mesMasAlto = predicciones.reduce((a, b) => a.reservasPredichas > b.reservasPredichas ? a : b);
    this.mesMasBajo = predicciones.reduce((a, b) => a.reservasPredichas < b.reservasPredichas ? a : b);
    this.totalIngresosEstimados = predicciones.reduce((s, p) => s + p.ingresosPredichos, 0);
    this.promedioReservas = predicciones.reduce((s, p) => s + p.reservasPredichas, 0) / predicciones.length;
  }

  private construirChart(historico: HistoricoMensual[], predicciones: PrediccionMensual[]): void {
    // Sin histórico no hay gráfico que construir (evita Array(-1) -> RangeError).
    if (!historico?.length || !predicciones?.length) {
      this.chartData = undefined;
      return;
    }

    // Etiquetas: todos los meses (histórico + predicción)
    const labelsHistorico = historico.map(h => this.etiquetaMes(h.anio, h.mes));
    const labelsPrediccion = predicciones.map(p => this.formatearPeriodo(p.periodo));
    const labels = [...labelsHistorico, ...labelsPrediccion];
    const n = historico.length;
    const m = predicciones.length;

    // Dataset 1 — Histórico real (línea sólida ámbar)
    const dataHistorico: (number | null)[] = [
      ...historico.map(h => h.totalReservas),
      ...Array(m).fill(null)
    ];

    // Dataset 2 — Predicción (línea punteada oscura)
    // Conecta desde el último punto histórico
    const dataPrediccion: (number | null)[] = [
      ...Array(n - 1).fill(null),
      historico[n - 1]?.totalReservas ?? null,  // punto de unión
      ...predicciones.map(p => Math.max(0, Math.round(p.reservasPredichas)))
    ];

    // Dataset 3 — Límite superior (banda de confianza)
    const dataSuperior: (number | null)[] = [
      ...Array(n - 1).fill(null),
      historico[n - 1]?.totalReservas ?? null,
      ...predicciones.map(p => Math.max(0, Math.round(p.limiteSuperiorReservas)))
    ];

    // Dataset 4 — Límite inferior (rellena hacia superior)
    const dataInferior: (number | null)[] = [
      ...Array(n - 1).fill(null),
      historico[n - 1]?.totalReservas ?? null,
      ...predicciones.map(p => Math.max(0, Math.round(p.limiteInferiorReservas)))
    ];

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Reservas históricas',
          data: dataHistorico,
          borderColor: 'rgba(223, 169, 116, 1)',
          backgroundColor: 'rgba(223, 169, 116, 0.15)',
          borderWidth: 2.5,
          pointBackgroundColor: 'rgba(223, 169, 116, 1)',
          pointRadius: 4,
          fill: 'origin',
          tension: 0.35,
          spanGaps: false
        },
        {
          label: 'Reservas predichas',
          data: dataPrediccion,
          borderColor: 'rgba(17, 17, 17, 0.85)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [6, 4],
          pointBackgroundColor: '#111',
          pointRadius: 4,
          fill: false,
          tension: 0.35,
          spanGaps: false
        },
        {
          label: 'Límite superior (95%)',
          data: dataSuperior,
          borderColor: 'rgba(223, 169, 116, 0.3)',
          backgroundColor: 'rgba(223, 169, 116, 0.08)',
          borderWidth: 1,
          pointRadius: 0,
          fill: '+1',
          tension: 0.35,
          spanGaps: false
        },
        {
          label: 'Límite inferior (95%)',
          data: dataInferior,
          borderColor: 'rgba(223, 169, 116, 0.3)',
          backgroundColor: 'transparent',
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          tension: 0.35,
          spanGaps: false
        }
      ]
    };
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  formatearPeriodo(periodo: string): string {
    const [anio, mes] = periodo.split('-');
    return this.etiquetaMes(+anio, +mes);
  }

  private etiquetaMes(anio: number, mes: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                   'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${meses[mes - 1]} ${anio}`;
  }

  nivelOcupacion(reservas: number): 'alta' | 'media' | 'baja' {
    if (!this.resultado?.predicciones.length) return 'media';
    const valores = this.resultado.predicciones.map(p => p.reservasPredichas);
    const max = Math.max(...valores);
    const ratio = reservas / max;
    if (ratio >= 0.66) return 'alta';
    if (ratio >= 0.33) return 'media';
    return 'baja';
  }

  rangoReservas(p: PrediccionMensual): string {
    const margen = Math.round((p.limiteSuperiorReservas - p.limiteInferiorReservas) / 2);
    return `± ${margen}`;
  }
}
