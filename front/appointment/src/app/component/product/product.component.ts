import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductCreateComponent, ProductListComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  services: Product[] = [];
  errorMessage = '';

  constructor(
    private popupService: PopupService,
    private productService: ProductService) {
    this.loadServices();
  }

  loadServices() {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '';

    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.services = data.sort((a, b) => b.id - a.id);
        },
        error: () => {
          this.popupService.error('Hiba történt a szolgáltatások betöltése során.');
        }
      });
  }

  onServiceCreated() {
    this.loadServices();
  }
}
