import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  onStartProductEditing = new Subject<number | null>();
  onRefreshProductList = new Subject<Product[]>();
  products: Product[] = [];
  editingProductId?: number | null;

  constructor() { }




  getProducts(): any {
    return this.products;
  }

  setProducts(products: Product[]): void {
    this.products = products;
    this.onRefreshProductList.next(this.products.slice());
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.onRefreshProductList.next(this.products.slice());
  }

  upatedProduct(newRecipe: Product, id: number): void {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = newRecipe;
    this.onRefreshProductList.next(this.products.slice());
  }

  // deleteProduct(id?: number | null): void {
  //   this.products = this.products.filter((product, index) => {
  //     return product.id !== id;
  //   });
  //   this.onRefreshProductList.next(this.products.slice());
  // }
  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
    this.onRefreshProductList.next(this.products.slice()); // Emit updated list after deletion
  }

  getEditingProductId(): any {
    console.log('asdakjdskjasdkjahsdkjasdh',this.editingProductId);

    return this.editingProductId;

  }

  getProductById(id: number | null): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  setEditingProductId(id: number | null): void {
    this.onStartProductEditing.next(id); // Broadcast the new editing ID
  }

  clearEditingProductId(): void {
    this.editingProductId = null;
    this.onStartProductEditing.next(null);
  }

}
