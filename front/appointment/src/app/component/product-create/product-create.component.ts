import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { PopupService } from '../../services/popup.service';

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
    private produsctService: ProductService,
    private popupService: PopupService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      durationMinutes: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const productData = this.form.value;

    this.produsctService.create(productData)
      .subscribe({
        next: (res) => {
          this.popupService.success(res.name + ' sikeresen létrehozva.');
          this.serviceCreated.emit();
          this.form.reset();
        },
        error: (err) => {
          this.popupService.error('Hiba történt a szolgáltatás létrehozása során.');
        }
      });
  }
}
