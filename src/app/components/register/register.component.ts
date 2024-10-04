import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.min(8)]),
      ],
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'User registered successfully!',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['./auth/login']);
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
      });
      this.registerForm.reset();
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
