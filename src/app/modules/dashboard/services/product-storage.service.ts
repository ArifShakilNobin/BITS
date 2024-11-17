import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorHandler } from '../../../shared/services/http-error-handler.service';
import { ServerResponse } from '../../../shared/models/dto/server-response.dto';
import { map, Observable, tap } from 'rxjs';
import { applicationUrls } from '../../../shared/application-constants/application-urls.const';
import { Product } from '../models/Product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStorageService {
  constructor(
    private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private router: Router,
    private productService: ProductService
  ) {}



  // saveProduct(product: Product): Observable<any> {
  //   return this.httpClient
  //     .post<ServerResponse>(
  //       `${applicationUrls.product.create}`,
  //       product
  //     )
  //     .pipe(
  //       tap((res) => {
  //         if (res.data) {
  //           console.log(res.data);
  //           this.productService.addProduct(res.data);
  //         }
  //       })
  //     );
  // }


  saveProduct(product: Product): Observable<any> {
    console.log('saveProduct called with:', product);
    return this.httpClient
      .post<ServerResponse>(`${applicationUrls.product.create}`, product)
      .pipe(
        tap((res) => {
          console.log('Response from saveProduct:', res);
          if (res.data) {
            this.productService.addProduct(res.data);
          }
        })
      );
  }


  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<ServerResponse>(`${applicationUrls.product.read}`)
      .pipe(
        map((serverResponse: ServerResponse) => {
          return serverResponse.data;
        }),
        tap((product: Product[]) => {
          this.productService.setProducts(product);
        })
      );
  }


  deleteProduct(id?: number | null): Observable<ServerResponse> {
    return this.httpClient
      .delete<ServerResponse>(`${applicationUrls.product.delete}` + id)
      .pipe(
        map((serverResponse: ServerResponse) => {
          return serverResponse.data;
        }),
        tap((updatedRole) => {
          this.productService.deleteProduct(id);
        })
      );
  }


  readProductById(id: number): Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(
      `${applicationUrls.product.readById}` + id
    );
  }




  updateProduct(product: Product): Observable<ServerResponse> {
    return this.httpClient
      .put<ServerResponse>(
        `${applicationUrls.product.update}` + product.id,
        product
      )
      .pipe(
        tap((res) => {
          if (res.data) {
            this.productService.upatedProduct(res.data, res.data.id);
          }
        })
      );
  }


}
