import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { PopupService } from '../../../services/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="email" name="email" placeholder="Email" required>
      <button type="submit">Küldés</button>
    </form>
  `
})
export class ForgotPasswordComponent {
  email = '';
  constructor(
    private authService: AuthService,
    private popupService: PopupService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.forgotPassword({ email: this.email }).subscribe({
      next: () => {
        this.popupService.success('Jelszó visszaállító email elküldve. Kérjük, ellenőrizze a postafiókját.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (Array.isArray(err.error) && err.error.length > 0) {
          this.popupService.error(err.error[0].message);
        } else {
          this.popupService.error('Hiba történt a jelszó visszaállító email küldése során.');
        }
      }
    });
  }
}
