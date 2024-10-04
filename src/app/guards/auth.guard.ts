import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyección de dependencias en función
  const router = inject(Router); // Inyectar el Router para redirigir si es necesario

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['./auth/login']);
    return false;
  }
};
