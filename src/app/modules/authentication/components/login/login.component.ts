import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { AuthenticationStorageService } from '../../services/authentication-storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisible = false;
  password?: string;
  loginForm: FormGroup;

  constructor(
    private authenticationStorageService: AuthenticationStorageService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });


    if (this.authenticationService.getIsUserAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {}



  login() {
    const credentials = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.authenticationStorageService.login(credentials).subscribe({
      next: (response) => {
        if (response.success === true) {
          // this.router.navigate(['home/dashboard']);
          // this.notification.success('Success', response.message);
          this.message.add({ severity: 'success', summary: 'Success', detail: response.message });
          this.router.navigate(['home/dashboard']);

        }
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'An unexpected error occurred';
        this.message.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      },
    });
  }

  resetLoginForm() {
    this.loginForm.reset();
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
