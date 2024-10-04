import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Metric } from '../interface/metric';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  baseUrl = 'http://localhost:3000/metric';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createMetric(metric: Metric): Observable<any> {
    const { username } = this.authService.decodeToken();
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.post(`${this.baseUrl}/${username}`, metric, { headers });
  }

  getHistory(): Observable<any> {
    const { username } = this.authService.decodeToken();
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get(`${this.baseUrl}/${username}`, { headers });
  }
}
