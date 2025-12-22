import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PopupService } from '../../services/popup.service';
import { ErrorPipe } from "../../services/validator/error.pipe";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, ErrorPipe],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private popupService: PopupService
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,20}$/)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      billingAddress: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http.post('http://localhost:8080/api/auth/register', this.form.value).subscribe({
      next: () => {
         this.router.navigate(['/login']);
        this.popupService.success(
          'Sikeres regisztráció! Erősítse meg az e-mail címét az e-mailben kiküldött link segítségével.'
        );
      },
      error: (err) => {
        this.successMessage = '';
        const e = err?.error;
        if (Array.isArray(e) && e.length) {
          this.popupService.error(e.map(x => x?.message).filter(Boolean).join('\n'));
          return;
        }
        this.popupService.error(e?.message || 'Sikertelen regisztráció!');
      },
    });
  }
}
