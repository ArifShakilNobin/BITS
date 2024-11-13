import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorHandler } from '../../../shared/services/http-error-handler.service';
import { ServerResponse } from '../../../shared/models/dto/server-response.dto';
import { Observable, tap } from 'rxjs';
import { applicationUrls } from '../../../shared/application-constants/application-urls.const';

@Injectable({
  providedIn: 'root',
})
export class ProductStorageService {
  constructor(
    private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private router: Router
  ) {}



  saveProduct(product: any): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(applicationUrls.product.create,product).pipe(
      tap({
        next: (response: ServerResponse) => {
          if (response.success) {
            //  console.log('Registration response:', response);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.httpErrorHandler.createErrorHandler(
            'Product Service'
          )(error);
        },
      })
    )
  }


  getProducts(): Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(applicationUrls.product.read).pipe(
      tap({
        next: (response: ServerResponse) => {},
        error: (error) => {
          this.httpErrorHandler.createErrorHandler(
            'Product Service'
          )(error);
        },
      })
    )
  }

  deleteProduct(id?: number): Observable<ServerResponse> {
    return this.httpClient.delete<ServerResponse>(applicationUrls.product.delete + id).pipe(
      tap({
        next: (response: ServerResponse) => {},
        error: (error) => {
          this.httpErrorHandler.createErrorHandler(
            'Product Service'
          )(error);
        },
      })
    )
  }

  getProductById(id: number | null): Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(applicationUrls.product.readById + id).pipe(
      tap({
        next: (response: ServerResponse) => {},
        error: (error) => {
          this.httpErrorHandler.createErrorHandler(
            'Product Service'
          )(error);
        },
      })
    )
  }


  updateProduct(product: any): Observable<ServerResponse> {
    return this.httpClient.put<ServerResponse>(applicationUrls.product.update,product).pipe(
      tap({
        next: (response: ServerResponse) => {},
        error: (error) => {
          this.httpErrorHandler.createErrorHandler(
            'Product Service'
          )(error);
        },
      })
    )
  }

}
