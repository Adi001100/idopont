import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input() services: Product[] = [];
  @Input() errorMessage = '';

  constructor(
    private http: HttpClient,
    private productComponent: ProductComponent
  ) { }

  editService(serviceId: number) {
    this.http
      .delete(`http://localhost:8080/api/product/edit/${serviceId}`, {
        withCredentials: true
      })
      .subscribe({
        next: () => {
          this.errorMessage = 'Szolgáltatás sikeresen módosítva.';
        },
        error: () => {
          this.errorMessage = 'Hiba történt a módosítás során.';
        }
      });
  }


  deleteService(serviceId: number) {
    this.http
      .delete(`http://localhost:8080/api/product/delete/${serviceId}`, {
        withCredentials: true
      })
      .subscribe({
        next: () => {
          // this.services = this.services.filter(s => s.id !== serviceId);
          this.productComponent.loadServices();
          if (this.services.length > 1) {
            this.errorMessage = 'Szolgáltatás sikeresen törölve.';
          }
        },
        error: () => {
          this.errorMessage = 'Hiba történt a törlés során.';
        }
      });
  }
}
