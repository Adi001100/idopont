import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { PopupService } from '../../services/popup.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private popupService: PopupService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const msg = history.state?.successMessage;
    if (msg) this.successMessage = msg;
  }


  onSubmit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/me']);
      },
      error: (err) => {
        if (Array.isArray(err.error) && err.error.length > 0) {
          this.popupService.error(err.error[0].message);
        } else {
          this.popupService.error('Hiba történt a bejelentkezés során.');
        }
      }
    });
  }
}
