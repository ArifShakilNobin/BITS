import { read } from 'xlsx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductStorageService } from '../../services/product-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { Observable, Observer, Subscription } from 'rxjs';
import { ServerResponse } from '../../../../shared/models/dto/server-response.dto';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit, OnDestroy {
  product!: Product;
  onStartProductEdit$?: Subscription;
  onEditingProductId?: number | null;
  productForm!: FormGroup;
  isEditMode!: boolean;
  editedItem: any;
  editedItemId?: number | null;
  products: Product[] = [];
  onProductSubscription$?: Subscription;

  constructor(
    private productService: ProductService,
    private productStorageService: ProductStorageService,
    private notification: MessageService,
    private fb: FormBuilder
  ) {
    this.onEditingProductId =this.productService.getEditingProductId();
    this.onStartProductEdit$ =
      this.productService.onStartProductEditing.subscribe((res) => {
        this.onEditingProductId = res;
      });
    this.products = this.productService.getProducts();
    if (this.products.length === 0) {
      this.productStorageService.getProducts().subscribe();
    }
    this.onProductSubscription$ =
      this.productService.onRefreshProductList.subscribe((res) => {
        this.products = res;
      });
  }



  ngOnDestroy(): void {
    this.onStartProductEdit$?.unsubscribe();
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price:['',Validators.required]
    });
    this.onStartProductEdit$ =
      this.productService.onStartProductEditing.subscribe(
        (id: number | null) => {
          this.editedItemId = id;
          this.isEditMode = this.editedItemId !== null;
          this.editedItem = this.productService.getProductById(id);
          this.productForm.patchValue(this.editedItem);
        }
      );
  }

  onSubmit(): void {
    for (const key of Object.keys(this.productForm.controls)) {
      this.productForm.controls[key].markAsDirty();
      this.productForm.controls[key].updateValueAndValidity();
    }
    this.product = this.productForm.value;
    if (this.onEditingProductId != null) {
      this.productStorageService.updateProduct(this.product).subscribe({
          next: (response) =>
            this.notification.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' }),
          error: (error) =>
            this.notification.add({ severity: 'error', summary: 'Failed', detail: 'Please! provide valid information' }),
        });
    } else if (this.product.name.trim() !== '') {
      this.productStorageService.saveProduct(this.product).subscribe({
          next: (response) =>
            this.notification.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product create successfully'
            }),
          error: (error) =>
            this.notification.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Please! provide valid information'
            }),
        });
    }
    this.resetForm();
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false;
    for (const key of Object.keys(this.productForm.controls)) {
      this.productForm.controls[key].markAsPristine();
      this.productForm.controls[key].updateValueAndValidity();
    }
  }

  OnDestroy(): void {
    this.onStartProductEdit$?.unsubscribe();
  }

}
