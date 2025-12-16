import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  services: Product[] = [];
  loading = false;

  constructor(private productService: ProductService, private popup: PopupService) {}

  ngOnInit(): void {
    this.loadCatalog();
  }

  loadCatalog() {
    this.loading = true;
    this.productService.getCatalog().subscribe({
      next: (products) => {
        this.services = products;
        this.loading = false;
      },
      error: () => {
        this.popup.error('Nem sikerült betölteni a szolgáltatásokat.');
        this.loading = false;
      }
    });
  }
}
