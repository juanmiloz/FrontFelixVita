import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          localStorage.setItem('token', `Bearer ${res.token}`);
          this.router.navigate(['/history']);
        },
        error: (err) => {
          Swal.fire({
            title: err.error.title,
            text: err.error.message,
            icon: 'error',
            confirmButtonColor: '#619396',
          });
        }
      });
      this.loginForm.reset();
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'Please fill in all required fields to access your account.',
        icon: 'error',
        confirmButtonColor: '#619396',
      });
    }
  }
}
