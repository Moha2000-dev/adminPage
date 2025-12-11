import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private base = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.base).pipe(
      map((data) => data),
      catchError((error) => {
        throw 'Error in source. Details: ' + error;
      })
    );
  }

  //delete product by id
  deleteProduct(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(
      map((data) => data),
      catchError((error) => {
        throw 'Error in source. Details: ' + error;
      })
    );
  }
  //ADD product
  addProduct(productData: any) {
    return this.http.post(this.base, productData).pipe(
      map((data) => data),
      catchError((error) => {
        throw 'Error in source. Details: ' + error;
      })
    );
  }
  //edit product
  editProduct(id: number, productData: any) {
    return this.http.put(`${this.base}/${id}`, productData).pipe(
      map((data) => data),
      catchError((error) => {
        throw 'Error in source. Details: ' + error;
      })
    );
  }
  updateProduct(id: number, prod: any) {
    return this.http.put(`${this.base}/${id}`, prod).pipe(
      map((data: any) => data),
      catchError((error) => throwError(() => error))
    );
  }
}
