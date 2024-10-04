import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      username: username,
      password: password
    });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username: username,
      password: password
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // No hay token
    }
    return !this.isTokenExpired(token); // Validar que el token no esté expirado
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token) as any;

    if (decodedToken.exp) {
      const expirationDate = new Date(0); // Fecha de la época
      expirationDate.setUTCSeconds(decodedToken.exp); // Establecer la fecha de expiración desde el token
      return expirationDate < new Date(); // Comparar con la fecha actual
    }

    return false; // Si no hay fecha de expiración en el token
  }




}
