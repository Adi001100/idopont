import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  errorMessage = '';

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private router: Router,
  ) { }

  logout() {
    this.http
      .post<{}>('http://localhost:8080/api/auth/logout', {}, {withCredentials: true})
      .subscribe({
        next: (res) => {
          this.errorMessage = 'Sikeres kijelentkezés'
          this.router.navigate(['/']);
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
