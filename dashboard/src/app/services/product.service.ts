import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }


  private getHeaders() {
    const token = localStorage.getItem('token');
    return { 'Authorization': `Bearer ${token}` };
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  addProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(this.API_URL, productData, { headers: this.getHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }


  updateProduct(id: string, productData: any): Observable<any> {
   
    return this.http.put(`${this.API_URL}/${id}`, productData, { headers: this.getHeaders() });
  }


  getAllCategories(): Observable<any> {
  return this.http.get('http://localhost:3000/api/categories'); 
}
}