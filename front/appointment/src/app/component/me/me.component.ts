import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  user$;
  passwordForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private popupService: PopupService
  ) {

    this.user$ = this.auth.currentUser$;
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]]
    });
  }

  getClientError(field: string): string | null {
    const c = this.passwordForm.get(field);
    if (!c || !(c.touched || c.dirty) || !c.errors) return null;

    if (c.errors['required']) return 'Kötelező mező.';
    if (c.errors['minlength']) return `Minimum ${c.errors['minlength'].requiredLength} karakter.`;
    return null;
  }

  onSubmit() {
    if (this.passwordForm.invalid) return;
    const { oldPassword, newPassword, confirmNewPassword } = this.passwordForm.value;
    if (newPassword !== confirmNewPassword) {
      this.popupService.error('Az új jelszavak nem egyeznek.');
      return;
    }

    this.auth.changePassword({ oldPassword, newPassword, confirmNewPassword }).subscribe({
      next: () => {
        this.popupService.success('Sikeres jelszóváltoztatás.');
        this.passwordForm.reset();
      },
      error: (err) => {
        if (err.error.details) {
          this.popupService.error(err.error.details);

        } else {
          this.popupService.error('Hiba történt a jelszóváltoztatás során.');
        }
      }
    });
  }
}
