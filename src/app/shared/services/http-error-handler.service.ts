import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { StatusCodes } from 'http-status-codes';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type ErrorHandler = <T>(
  operation?: string,
  handlingMode?: 'safe' | 'conceal' | 'actual',
  result?: T
) => (error: HttpErrorResponse) => Observable<T> | Observable<never>;

/** Handles HttpClient errors */
@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  constructor(
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) {}

  /** Create curried handleError function that already knows the service name */
  createErrorHandler =
    (serviceName = 'unknown') =>
    <T>(operation = 'unknown', handlingMode = '', result = {} as T) =>
      this.handleError(serviceName, operation, handlingMode, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(
    serviceName = '',
    operation = '',
    handlingMode = '',
    result = {} as T
  ): (
    httpErrorResponse: HttpErrorResponse
  ) => Observable<T> | Observable<never> {
    return (
      httpErrorResponse: HttpErrorResponse
    ): Observable<T> | Observable<never> => {
      let errorMessage = '';
      if (
        httpErrorResponse.status === 0 ||
        httpErrorResponse.error instanceof ErrorEvent
      ) {
        // A client-side or network error occurred. Handle it accordingly.
        // console.error(
        //   'A client-side or network error occurred:',
        //   httpErrorResponse.error
        // );
        errorMessage = 'A client-side or network error occurred';
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        // console.error(
        //   `Backend returned code ${httpErrorResponse.status}, ` +
        //     `body was: ${httpErrorResponse.error}`
        // );
        errorMessage = `${httpErrorResponse.error.message}`;
      }

      // TODO: send the error to remote logging infrastructure
      console.error(
        `Full httpErrorResponse from Service: ${serviceName}, Operation: ${operation} -->: `,
        httpErrorResponse
      ); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.messageService.add(
      //   `${serviceName}: ${operation} failed: ${errorMessage}`
      // );

      if (handlingMode === 'safe') {
        // Let the app keep running by returning a safe result.
        return of(result);
      } else if (handlingMode === 'conceal') {
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
      } else if (handlingMode === 'actual') {
        // Let app keep running but indicate failure.
        return throwError(httpErrorResponse);
      } else {
        switch (httpErrorResponse.status) {
          case StatusCodes.UNAUTHORIZED:
            if (this.authenticationService.CurrentUserValue) {
              this.authenticationService.logout();
              return throwError('Please Login once again');
            } else {
              return throwError('Your email or password is incorrect');
            }
          case StatusCodes.LOCKED:
            return throwError(httpErrorResponse.error.message);
          case StatusCodes.NOT_FOUND:
            return throwError(`Resource Not Found`);
          case StatusCodes.FORBIDDEN: {
            return throwError(`Access Denied! Please contact with the admin`);
          }
          case StatusCodes.INTERNAL_SERVER_ERROR: {
            return throwError(
              `Something bad happened; please try again later.`
            );
          }
          default: {
            return throwError(`${errorMessage}`);
          }
        }
      }
    };
  }
}
