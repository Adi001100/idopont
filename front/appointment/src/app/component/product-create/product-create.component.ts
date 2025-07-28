import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductListComponent } from "../product-list/product-list.component";
@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ProductListComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  form: FormGroup;
  errorMessage = '';

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
    if (this.form.invalid) {
      return
    };

    const serviceData = this.form.value;

    this.http
      .post<{ name: string }>('http://localhost:8080/api/product/create', serviceData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/create'])
          this.errorMessage = res.name + ' sikeresen létrehiozva.'
          console.log(res);
          this.form.reset();
        },
        error: (err) => {
          this.errorMessage = 'Hiba történt a létrehozás során.';
          console.error(err);
        }
      });
  }

}
