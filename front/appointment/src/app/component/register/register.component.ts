import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
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
    private router: Router
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

  getClientError(field: string): string | null {
    const c = this.form.get(field);
    if (!c || !(c.touched || c.dirty) || !c.errors) return null;

    if (c.errors['required']) return 'Kötelező mező.';
    if (c.errors['email']) return 'Érvénytelen e-mail cím.';
    if (c.errors['minlength']) return `Minimum ${c.errors['minlength'].requiredLength} karakter.`;
    if (c.errors['pattern']) return 'Hibás telefonszám formátum.';
    return null;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http.post('http://localhost:8080/api/auth/register', this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/login'], {
          state: {
            successMessage:
              'Sikeres regisztráció! Erősítse meg az e-mail címét az e-mailben kiküldött link segítségével.'
          }
        });
      },
      error: (err) => {
        this.successMessage = '';
        const e = err?.error;
        if (Array.isArray(e) && e.length) {
          this.errorMessage = e.map(x => x?.message).filter(Boolean).join('\n');
          return;
        }
        this.errorMessage = e?.message || 'Sikertelen regisztráció!';
      },
    });
  }
}
