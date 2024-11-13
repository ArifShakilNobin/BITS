import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ServerResponse } from '../../../shared/models/dto/server-response.dto';
import { applicationUrls } from '../../../shared/application-constants/application-urls.const';
import { ErrorHandler, HttpErrorHandler } from '../../../shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStorageService {
  private handleError: ErrorHandler;
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    // private authorizationService: AuthorizationService,
    private httpErrorHandler: HttpErrorHandler,
    private router: Router
  ) {
    this.handleError = this.httpErrorHandler.createErrorHandler(
      'Authentication Service'
    );
  }


  registration(userLoginCredential: User): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(applicationUrls.user.register,userLoginCredential).pipe(
      tap({
        next: (response: ServerResponse) => {
          if (response.success) {
            //  console.log('Registration response:', response);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.authenticationService.currentUserSubject.next(error);
        },
      })
    )
  }
  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(applicationUrls.user.login, credentials).pipe(
      tap(response => {
        // console.log('Login response:', response);

        if (response && response.success && response.data ) {
          localStorage.setItem('token', response.data);
        } else {
          console.error('Token not found in the response');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
