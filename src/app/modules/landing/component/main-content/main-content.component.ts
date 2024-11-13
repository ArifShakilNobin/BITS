import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { applicationPermissions } from '../../../../shared/application-constants/application-permissions';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  isShowTab: boolean = false;
  userInfo: any;
  isOkLoading = false;

  applicationPermissions = applicationPermissions;

  constructor(
    private router: Router,
    private notification: MessagesModule,
    private modal: DialogModule
  ) {}

  ngOnInit() {
    let currentuserInfo = localStorage.getItem('currentUserInfo');
    if (currentuserInfo != null) {
      this.userInfo = JSON.parse(currentuserInfo);
    }
  }
}
