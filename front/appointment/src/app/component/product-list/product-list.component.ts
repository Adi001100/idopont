import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  services: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) { }

  //csak sajátra megcsinálni
  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/api/product/getAll',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe({
        next: (data) => {
          this.services = data;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Hiba történt a szolgáltatások betöltésekor.';
        }
      });
  }
}
