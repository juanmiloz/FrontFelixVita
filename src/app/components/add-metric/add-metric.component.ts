import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MetricsService } from 'src/app/services/metrics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-metric',
  templateUrl: './add-metric.component.html',
  styleUrls: ['./add-metric.component.css'],
})
export class AddMetricComponent {
  public metricForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private metricsService: MetricsService,
    private router: Router
  ) {
    this.metricForm = this.formBuilder.group({
      waterIntake: ['', Validators.required],
      sleepHours: ['', Validators.required],
      mood: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get waterIntake() {
    return this.metricForm.get('waterIntake');
  }

  get sleepHours() {
    return this.metricForm.get('sleepHours');
  }

  get mood() {
    return this.metricForm.get('mood');
  }

  onInput(event: any): void {
    const value = event.target.value;

    if (value < 0) {
      event.target.value = 0;
      Swal.fire({
        title: 'Sorry',
        text: 'You cannot enter values less than 0',
        icon: 'info',
        confirmButtonColor: '#619396',
      });

      this.metricForm.controls[event.target.id].setValue(0);
    }
  }

  addMetric() {
    if (this.metricForm.valid) {
      this.metricsService.createMetric(this.metricForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Success',
            text: 'Metric added successfully!',
            icon: 'success',
            confirmButtonColor: '#619396',
          });
          this.router.navigate(['/history']);

        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: err.error.title,
            text: err.error.message,
            icon: 'error',
            confirmButtonColor: '#619396',
          });
        },
      })
      this.metricForm.reset();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields to add a metric.',
        icon: 'error',
        confirmButtonColor: '#619396',
      });
    }
  }
}
