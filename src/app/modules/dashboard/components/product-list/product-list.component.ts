import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductStorageService } from '../../services/product-storage.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  productFiltered: Product[] = [];
  onProductSubscription$: Subscription;


  constructor(
    private productStorageService: ProductStorageService,
    private cdr: ChangeDetectorRef,  // Inject ChangeDetectorRef
    private productService: ProductService

  ) {
    this.products = this.productService.getProducts();
    this.productFiltered = [...this.products];
    if (this.products.length === 0) {
      this.productStorageService.getProducts().subscribe();
    }
    this.onProductSubscription$ =
      this.productService.onRefreshProductList.subscribe((res) => {
        this.products = res;
        this.productFiltered = [...this.products];
      });

  }
  ngOnInit(): void {
    this.onProductSubscription$ = this.productService.onRefreshProductList.subscribe({
      next: (updatedProducts) => {
        this.products = updatedProducts;
        this.productFiltered = [...this.products]; // Reflect changes in filtered list
      }
    });

    this.getProducts();
  }

  getProducts(): void {
    this.productStorageService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.data;
        console.log(this.products);
      }
    });
  }

  onDelete(id: number): void {
    this.productStorageService.deleteProduct(id).subscribe({
      next: (response: any) => {
        // Update the local products array by removing the deleted product
        this.products = this.products.filter(product => product.id !== id);
        this.cdr.detectChanges();

        console.log(`Product with ID ${id} deleted successfully and list updated.`);
      },
      error: (err) => {
        console.error(`Failed to delete product with ID ${id}:`, err);
      }
    });
  }

  onEdit(id: number): void {
    console.log('Editing Product ID:', id);
    this.productService.setEditingProductId(id); // Set the ID in the service
  }

  ngOnDestroy(): void {
    this.onProductSubscription$?.unsubscribe();
  }

}

