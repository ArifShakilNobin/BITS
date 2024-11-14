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
  products: Product[] = [];
  productFiltered: Product[] = [];
  private onProductSubscription$?: Subscription;


  constructor(
    private productStorageService: ProductStorageService,
    private cdr: ChangeDetectorRef,  // Inject ChangeDetectorRef
    private productService: ProductService

  ) {}
  ngOnInit(): void {
      // Subscribe to the onRefreshProductList observable for real-time updates
      this.onProductSubscription$ = this.productService.onRefreshProductList.subscribe({
        next: (updatedProducts) => {
          this.products = updatedProducts;
          this.productFiltered = [...this.products]; // Reflect changes in filtered list
          this.cdr.detectChanges(); // Trigger change detection
        }
      });

      // Fetch initial product list from backend
      this.getProducts();

  }

  getProducts(): void {
    this.productStorageService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.data;
        this.productFiltered = [...this.products];
        this.productService.setProducts(this.products); // Emit updated list
      }
    });
  }

  onDelete(id: number): void {
    this.productStorageService.deleteProduct(id).subscribe({
      next: () => {
        this.productService.deleteProduct(id); // Use service to handle deletion
        this.cdr.detectChanges();
      },
      error: (err) => console.error(`Failed to delete product with ID ${id}:`, err)
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

