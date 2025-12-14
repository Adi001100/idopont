import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductCreateComponent, ProductListComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  services: Product[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) {
    this.loadServices();
  }

  loadServices() {
    this.http
      .get<Product[]>('http://localhost:8080/api/product/getAll', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe({
        next: (data) => {
          this.services = data.sort((a, b) => b.id - a.id);
        },
        error: () => {
          this.errorMessage = 'Hiba történt a szolgáltatások betöltésekor.';
        }
      });
  }

  onServiceCreated() {
    this.loadServices();
  }
}
