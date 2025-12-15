import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { withCredentials: true });
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  create(service: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, service, { withCredentials: true });
  }

  update(id: number, service: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, service, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
