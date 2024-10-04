import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MetricsHistoryComponent } from './components/metrics-history/metrics-history.component';
import { AddMetricComponent } from './components/add-metric/add-metric.component';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: 'history',
    component: MetricsHistoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-metric',
    component: AddMetricComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent }, // Subruta de login
      { path: 'register', component: RegisterComponent }, // Subruta de registro
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
