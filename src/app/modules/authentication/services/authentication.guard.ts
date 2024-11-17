import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { AuthenticationStorageService } from './authentication-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard  {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authenticationStorageService: AuthenticationStorageService
  ) {}

  canActivate(): boolean {
    if (this.authenticationStorageService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
