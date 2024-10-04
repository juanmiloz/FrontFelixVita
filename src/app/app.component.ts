import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'FrontFelixVita';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoggedIn();
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const log = this.authService.isLoggedIn();
    return log;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

}
