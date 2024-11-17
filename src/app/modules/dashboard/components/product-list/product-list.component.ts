import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductStorageService } from '../../services/product-storage.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  onProductSubscription$?: Subscription;
  productFiltered: Product[] = [];

  constructor(
    private productService: ProductService,
    private productStorageService: ProductStorageService,
    private notification: MessageService,

  ) {
    console.log('Product List Component');

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
  }

  ngOnDestroy(): void {
    this.onProductSubscription$?.unsubscribe();
  }

  addNewProduct(): void {
    this.productService.clearEditingProductId();
  }

  onEdit(id: number): void {
    this.productService.setEditingProductId(id);
  }

  onDelete(id: number): void {
    this.productStorageService.deleteProduct(id).subscribe({
      next: () =>
        this.notification.add('Success: Product deleted successfully'), // Single string format
      error: () =>
        this.notification.add('Failed: Please provide valid information'), // Single string format
    });
  }






}

