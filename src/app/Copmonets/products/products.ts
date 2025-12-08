import { Products } from './../../services/products';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products as ProductsService } from './../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent {
  products = signal<any[]>([]);
  isloading = signal<boolean>(false); //loading state
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.loadProducts();
  }
  //load products
  loadProducts() {
    this.isloading.set(true);
    this.productsService.getProducts().subscribe(
      (res: any) => {
        this.products.set(res);
        this.isloading.set(false);
        console.log('this products ', this.products());
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isloading.set(false);
      }
    );
  }
  //delete product
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.isloading.set(true);
      this.productsService.deleteProduct(id).subscribe(
        (res: any) => {
          console.log('Deleted product response:', res);

          const updatedProducts = this.products().filter((p) => p.id !== id);
          this.products.set(updatedProducts);
          console.log('Deleted product response:', res);

          this.isloading.set(false);
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.isloading.set(false);
        }
      );
    }
  }
}
