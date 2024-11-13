import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Idle } from 'idlejs';
import { AuthenticationStorageService } from './modules/authentication/services/authentication-storage.service';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authenticationStorageService: AuthenticationStorageService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    // this.authenticationStorageService.autoLoginUser();
 }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);

      const idle = new Idle()
        .whenNotInteractive()
        .within(environment.autoLogoutTime.inMinute)
        .do(() => this.logout())
        .start();
    });
  }

  logout() {
    this.authenticationStorageService.logout();
  }
}
