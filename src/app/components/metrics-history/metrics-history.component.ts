import { Component, OnInit } from '@angular/core';
import { Metric } from 'src/app/interface/metric';
import { MetricsService } from 'src/app/services/metrics.service';

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
    this.metricsService.getHistory().subscribe({
      next: (res) => {
        this.metrics = res.metrics;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
