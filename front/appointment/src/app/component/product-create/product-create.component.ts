import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  form: FormGroup;
  errorMessage = '';

  @Output() serviceCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      durationMinutes: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const serviceData = this.form.value;

    this.http
      .post<{ name: string }>('http://localhost:8080/api/product/create', serviceData, {
        withCredentials: true
      })
      .subscribe({
        next: (res) => {
          this.errorMessage = res.name + ' sikeresen létrehozva.';
          this.serviceCreated.emit();
          this.form.reset();
        },
        error: (err) => {
          this.errorMessage = 'Hiba történt a létrehozás során.';
        }
      });
  }
}
