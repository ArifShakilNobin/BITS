import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRequiredPermission]',
})
export class RequiredPermissionDirective implements OnInit {
  @Input('appRequiredPermission') permission = ''; // Required permission passed in

  constructor(
    private el: ElementRef,
    // public authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    // if (!this.authorizationService.checkIfCurrentUserHavePermission(this.permission)) {
    //   this.el.nativeElement.style.display = 'none';
    // }
  }

}
