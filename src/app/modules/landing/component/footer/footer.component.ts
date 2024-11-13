import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copywriteNotice: any;
  constructor() { }

  ngOnInit() {
    // this.copywriteNotice = '© 2021 - ' + new Date().getFullYear() + ' Realsheet';
    this.copywriteNotice = '©' + new Date().getFullYear() + ' Realsheet';
  }


}
