import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';
import { PopupService } from '../../services/popup.service';
import { ProductService } from '../../services/product.service';

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
    private productComponent: ProductComponent,
    private productService: ProductService,
    private popupService: PopupService
  ) { }

  editService(serviceId: number) {
    this.productService.update(serviceId, null as any) // Pass the updated service data here
      .subscribe({
        next: () => {
          this.popupService.success('Szolgáltatás sikeresen módosítva.');
        },
        error: () => {
          this.popupService.error('Hiba történt a módosítás során.');
        }
      });
  }

  confirmDeleteService(serviceId: number) {
    this.popupService.confirm(
      'Biztosan törölni szeretné ezt a szolgáltatást?',
      () => this.deleteService(serviceId),
      'Törlés megerősítése',
      'Törlés',
      'Mégse'
    );
  }

  deleteService(serviceId: number) {
    this.productService.delete(serviceId)
      .subscribe({
        next: () => {
          this.productComponent.onServiceCreated();
          this.popupService.success('Szolgáltatás sikeresen törölve.');
        },
        error: () => {
          this.popupService.error('Hiba történt a törlés során.');
        }
      });
  }
}
