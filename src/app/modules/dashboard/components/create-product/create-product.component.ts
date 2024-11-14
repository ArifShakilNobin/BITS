import { read } from 'xlsx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductStorageService } from '../../services/product-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { Subscription } from 'rxjs';
import { ServerResponse } from '../../../../shared/models/dto/server-response.dto';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit, OnDestroy {
  title = 'Create New Product';
  product!: Product;
  onStartProductEdit$?: Subscription;
  onEditingProductId?: number | null;
  productForm!: FormGroup;
  isEditMode!: boolean;
  editedItem: any;
  editedItemId?: number | null;
  products: Product[] = [];
  onProductSubscription$: Subscription | undefined;
  editingProductId: number | null = null;
  private productEditSub!: Subscription;

  constructor(
    private productService: ProductService,
    private ProductStorage: ProductStorageService,
    private message: MessageService,
    private fb: FormBuilder
  ) {}


  ngOnDestroy(): void {
    this.onStartProductEdit$?.unsubscribe();
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
    // Subscribe to the editing product ID changes
    this.onStartProductEdit$ = this.productService.onStartProductEditing.subscribe(
      (id: number | null) => {
        console.log('Editing Product ID create:', id);

        this.onEditingProductId = id;

        console.log('Editing Product ID create 2:', this.onEditingProductId);

        this.isEditMode = id !== null;

        console.log('Editing Product ID create 3:', this.isEditMode);

        if (this.isEditMode) {
          this.ProductStorage.getProductById(id).subscribe((response: any) => {
            console.log('Server Response:', response); // Log entire response

            // const product = response.data as Product; // Assuming ServerResponse has a 'data' property that contains the Product object
            this.product = response;
            console.log('Editing Product ID create 4:', this.product );

            if (this.product ) {
              this.productForm.patchValue(this.product ); // Patch form with product details
            }
          });
        }
      }
    );
  }


  onSubmit(): void {
    for (const key of Object.keys(this.productForm.controls)) {
      this.productForm.controls[key].markAsDirty();
      this.productForm.controls[key].updateValueAndValidity();
    }

    this.product = this.productForm.value;

    if (this.isEditMode) {
      this.ProductStorage.updateProduct(this.product).subscribe({
        next: () => {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
          this.productService.upatedProduct(this.product, this.product.id); // Update the list
          this.resetForm(); // Reset form and change button to "Create Product"
        },
        error: (error: HttpErrorResponse) => {
          this.message.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      });
    } else {
      this.ProductStorage.saveProduct(this.product).subscribe({
        next: () => {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Product created successfully' });
          this.productService.addProduct(this.product); // Add new product to the list
          this.resetForm(); // Reset form and change button to "Create Product"
        },
        error: (error: HttpErrorResponse) => {
          this.message.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      });
    }
  }

  OnDestroy(): void {
    this.onStartProductEdit$?.unsubscribe();
  }

  private resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false; // Set edit mode to false, so button label changes to "Create Product"
  }
}
