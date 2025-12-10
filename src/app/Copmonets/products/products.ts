import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Products as ProductsService } from './../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent {
  products = signal<any[]>([]);
  isloading = signal<boolean>(false);

  modelOpen = signal(false);
  editingProduct = signal(false);
  productId: any = null;
  productForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
      image: ['', [Validators.required]],
    });
  }


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


  openModal(product?: any) {
    this.modelOpen.set(true);

    if (product) {
   
      this.editingProduct.set(true);
      this.productId = product.id;

      this.productForm.setValue({
        title: product.title || '',
        price: product.price || 0,
        category: product.category || '',
        description: product.description || '',
        image: product.image || '',
      });
    } else {
  
      this.editingProduct.set(false);
      this.productId = null;
      this.productForm.reset({
        title: '',
        price: 0,
        category: '',
        description: '',
        image: '',
      });
    }
  }

 
  closeModal() {
    this.modelOpen.set(false);
  }

 
  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;

    
    const payload = {
      id: this.productId,
      title: formValue.title,
      price: formValue.price,
      category: formValue.category,
      description: formValue.description,
      image: formValue.image,
    };

    console.log('Product payload:', payload);

    if (this.editingProduct()) {
      this.productsService.editProduct(this.productId, payload).subscribe(
        (res: any) => {
          this.products.update((currentProducts) => {
            const index = currentProducts.findIndex((p) => p.id === this.productId);
            if (index !== -1) {
              currentProducts[index] = res;
            }
          
            return [...currentProducts];
          });

          this.closeModal();
        },
        (error) => {
          console.error('Error editing product:', error);
          alert(error.error?.message || 'Failed to edit product');
        }
      );
    }

    else {
      this.productsService.addProduct(payload).subscribe(
        (createdProduct: any) => {
          this.products.update((currentProducts) => [
            ...currentProducts,
            createdProduct,
          ]);
          this.closeModal();
        },
        (err: any) => {
          console.error('Create product failed:', err);
          alert(err.error?.message || 'Failed to create product');
        }
      );
    }
  }


  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.isloading.set(true);

      this.productsService.deleteProduct(id).subscribe(
        (res: any) => {
          console.log('Deleted product response:', res);

          const updatedProducts = this.products().filter((p) => p.id !== id);
          this.products.set(updatedProducts);

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
