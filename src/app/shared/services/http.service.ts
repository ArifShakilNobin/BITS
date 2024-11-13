import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private BASE_URL = '/api';

  constructor(private http: HttpClient) {}

  private modelResult(result: any, model: any) {
    if (!result) {
      return result;
    }
    return new model(result);
  }

  private catchError(error: any): Observable<string> {
    if (!error.error) {
      console.error(error);
      return throwError(error);
    }
    let message = error.error.message;
    if (!message) {
      for (const field in error.error) {
        message = error.error[field];
        break;
      }
    }
    console.error(message);
    return throwError(message);
  }

  postModel(url: string, model: any, prams: any): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.post(`${this.BASE_URL}/${url}`, prams).pipe(
      map((result: any) => this.modelResult(result, model)),
      catchError(this.catchError)
    );
  }

  putModel(url: string, model: any, prams: any): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.put(`${this.BASE_URL}/${url}`, prams).pipe(
      map((result: any) => this.modelResult(result, model)),
      catchError(this.catchError)
    );
  }

  getModel(url: string, model: any, multi = false): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.get(`${this.BASE_URL}/${url}`).pipe(
      map((result: any) => {
        if (!multi) {
          return this.modelResult(result, model);
        } else {
          const models = [];
          for (const item of result) {
            models.push(this.modelResult(item, model));
          }
          return models;
        }
      }),
      catchError(this.catchError)
    );
  }

  put(url: string, prams: any): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.put(`${this.BASE_URL}/${url}`, prams).pipe(
      map((result: any) => result),
      catchError(this.catchError)
    );
  }

  post(url: string, prams: any): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.post(`${this.BASE_URL}/${url}`, prams).pipe(
      map((result: any) => result),
      catchError(this.catchError)
    );
  }

  get(url: string): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.get(`${this.BASE_URL}/${url}`).pipe(
      map((result: any) => result),
      catchError(this.catchError)
    );
  }

  getWithParams(url: string, params: any): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    const parameters = new HttpParams();
    for (const param in params) {
      parameters.append(param, params[param]);
    }
    return this.http.get(`${this.BASE_URL}/${url}`, { params }).pipe(
      map((result: any) => result),
      catchError(this.catchError)
    );
  }

  destroy(url: string): Observable<any> {
    if (!url) {
      throw new Error('empty url');
    }
    return this.http.delete(`${this.BASE_URL}/${url}`).pipe(
      map((result: any) => result),
      catchError(this.catchError)
    );
  }

  constructParam(paramObj: any): HttpParams {
    let queryParams = new HttpParams();
    for (const param in paramObj) {
      if (paramObj.hasOwnProperty(param)) {
        if (Array.isArray(paramObj[param])) {
          paramObj[param].forEach((filter: any) => {
            queryParams = queryParams.append(filter.key, filter.value);
          });
        } else if (typeof paramObj[param] === 'object') {
          queryParams = queryParams.appendAll(paramObj[param]);
          // queryParams = this.constructParam(paramObj[param])
          // you can not use a recursive function because queryParam:HttpParams is immutable
        } else {
          queryParams = queryParams.append(param, paramObj[param]);
        }
      }
    }
    return queryParams;
  }
}
