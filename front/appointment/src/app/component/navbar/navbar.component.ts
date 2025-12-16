import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PopupService } from '../../services/popup.service';

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
    private popupService: PopupService
  ) { this.isLoggedIn$ = this.auth.isLoggedIn$; }

  confirmLogout() {
    this.popupService.confirm('Biztosan ki szeretne jelentkezni?', () => {
      this.logout();
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.popupService.success('Sikeresen kijelentkezett.');
      },
      error: (err) => {
        if (Array.isArray(err.error) && err.error.length > 0) {
          this.popupService.error(err.error[0].message);
        } else {
          this.popupService.error('Hiba történt a kijelentkezés során.');
        }
      }
    });
  }
}
