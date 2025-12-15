import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  errorMessage = '';
  isLoggedIn$;
  authService: any;

  constructor(
    public auth: AuthService,
  ) { this.isLoggedIn$ = this.auth.isLoggedIn$; }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.errorMessage = '';
      },
      error: (err) => {
        if (Array.isArray(err.error) && err.error.length > 0) {
          this.errorMessage = err.error[0].message;
        } else {
          this.errorMessage = 'Ismeretlen hiba történt.';
        }
      }
    });
  }
}
