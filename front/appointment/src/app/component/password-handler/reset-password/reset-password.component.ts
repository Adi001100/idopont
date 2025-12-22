import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="newPassword" name="newPassword" placeholder="Új jelszó" required>
      <input [(ngModel)]="confirmNewPassword" name="confirmNewPassword" placeholder="Új jelszó újra" required>
      <button type="submit">Mentés</button>
    </form>
  `
})
export class ResetPasswordComponent {
  newPassword = '';
  confirmNewPassword = '';
  token = ''; // a query param-ból lehet lekérni

  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private popupService: PopupService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => this.token = params['token']);
  }

  onSubmit() {
    this.authService.resetPassword({token: this.token, newPassword: this.newPassword, confirmNewPassword: this.confirmNewPassword})
      .subscribe({
        next: () => {
          this.popupService.success('Jelszó sikeresen megváltoztatva.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (Array.isArray(err.error) && err.error.length > 0) {
            this.popupService.error(err.error[0].message);
          } else {
            this.popupService.error('Hiba történt a jelszó visszaállítása során.');
          }
        }
      });
  }
}

// https://localhost:4200/reset-password?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEuYSIsImlhdCI6MTc2NjI3NjkzMiwiZXhwIjoxNzY2Mjc3ODMyfQ.Trt5pL5W4WKil5XEHDb8GMaKj_ghtMLbLkMPNSOtNRU