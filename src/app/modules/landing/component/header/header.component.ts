import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  isLoginHidden: boolean = false;
  isProfileHidden: boolean = true;
  userInfo: any;
  napUserInfo: any;
  currentUserInfo: any;
  visible: boolean = false;

  constructor(public router: Router) {}


  toggleMobileMenu() {
    this.visible = !this.visible;
  }
  onLogout(){}


}
