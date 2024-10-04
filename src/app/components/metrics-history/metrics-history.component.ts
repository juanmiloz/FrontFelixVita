import { Component, OnInit } from '@angular/core';
import { Metric } from 'src/app/interface/metric';
import { MetricsService } from 'src/app/services/metrics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metrics-history',
  templateUrl: './metrics-history.component.html',
  styleUrls: ['./metrics-history.component.css']
})
export class MetricsHistoryComponent implements OnInit {

  metrics: Metric[] = [];

  constructor(
    private metricsService: MetricsService,
  ) { }

  ngOnInit(): void {
    this.getMetrics()
  }

  getMetrics() {
    this.metricsService.getHistory().subscribe({
      next: (res) => {
        this.metrics = res.metrics;
      },
      error: (err) => {
        Swal.fire({
          title: err.error.title,
          text: err.error.message,
          icon: 'error',
          confirmButtonColor: '#619396',
        });
      }
    })
  }

  closeModal() {
    this.getMetrics();
  }

}
