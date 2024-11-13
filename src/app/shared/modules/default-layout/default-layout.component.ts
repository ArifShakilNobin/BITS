import { Component, OnInit } from '@angular/core';
import { applicationPermissions } from '../../application-constants/application-permissions';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationStorageService } from '../../../modules/authentication/services/authentication-storage.service';
import { AuthenticationService } from '../../../modules/authentication/services/authentication.service';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  isCollapsed = false;
  applicationPermissions = applicationPermissions;
  constructor(
    public authorizationService: AuthenticationService,
    private authenticationService: AuthenticationService,
    private notification: MessagesModule,
    private router: Router,
    private authStorageService: AuthenticationStorageService,
  ) {}


// Define your sidebar menu items here
menuItems = [
  // { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
  // {
  //   label: 'User', icon: 'pi pi-user', items: [
  //     { label: 'Profile', icon: 'pi pi-user', routerLink: '/home/user/profile' }
  //   ]
  // },
  {
    label: 'Product', icon: 'pi pi-calendar', routerLink: 'dashboard/product',
    // items: [
    //   { label: 'Create Product', icon: 'pi pi-calendar-plus', routerLink: 'dashoard/product' }
    // ]
  }
];

// Define profile menu items for the header
profileMenuItems = [
  // { label: 'Change Password', icon: 'pi pi-cog', command: () => this.onChangePassword() },
  // { label: 'Profile', icon: 'pi pi-user', routerLink: '/home/user/profile' },
  { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onLogout() }
];

  ngOnInit(): void {}
  onLogout() {
    this.authStorageService.logout();
  }

  userProfile() {
    throw new Error('Method not implemented.');
  }
  onChangePassword() {
    throw new Error('Method not implemented.');
  }
}
