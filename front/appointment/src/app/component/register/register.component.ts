import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      address: [''],
      billingAddress: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http.post('http://localhost:8080/api/auth/register', this.form.value).subscribe({
      next: () => {
        this.errorMessage = '';
        this.successMessage = 'Sikeres regisztráció! Erősítse meg az e-mail címét az e-mailben kiküldött link segítségével.';
      },
      error: (error) => {
        this.successMessage = '';
        this.errorMessage = error?.error?.message || 'Sikertelen regisztráció!';
      },
    });
  }
}
