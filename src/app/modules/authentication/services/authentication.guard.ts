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
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   const user = this.authenticationService.CurrentUserValue;
  //   if (user?.id != null) {
  //     // check if route is restricted by role
  //     if (route.data['roles'] && route.data['roles'].indexOf(user.roles) === -1) {
  //       // role not authorised so redirect to home page
  //       this.router.navigate(['/']);
  //       return false;
  //     }

  //     // authorised so return true
  //     return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }

  canActivate(): boolean {
    if (this.authenticationStorageService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
