import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../modules/authentication/services/authentication.service';
import { AuthenticationStorageService } from '../../../modules/authentication/services/authentication-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private authStorageService: AuthenticationStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = this.authStorageService.getToken();
    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: 'Bearer ' + authToken },
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
