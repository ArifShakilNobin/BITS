import { applicationUrls } from '../../application-constants/application-urls.const';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { RequestCache } from '../request-cache.service';


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

}
