import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationStorageService } from '../../services/authentication-storage.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService]  // Provide MessageService here

})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  regex = /[a-zA-Z]*/;
  userNameRegex = /^[a-zA-Z\s][a-zA-Z0-9\s][-'\w\s]+$/; //update pattern for User Name
  Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%?&^*;:,<>.`~-])[A-Za-z\d$@#$!%?&^*;:,<>.`~-]{8,}$/;

  // for Otp
  tempNumber = 0;
  isVisible = false;
  validateForm!: FormGroup;
  otpForm!: FormGroup;
  // mobile
  contactNumber!: string;
  // otp
  receivedOtp!: string;
  nzFooterVisible = false;
  emailAlredyExist = false;
  nameAlredyExist = false;
  display: any;

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    private authenticationStorageService: AuthenticationStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(this.Password),],],
      confirmPassword: ['', [Validators.minLength(8), this.confirmValidator]],
      role: ['', [Validators.required]],
    });


  }


  handleCancel() {
    throw new Error('Method not implemented.');
  }


  // submitForm() {
  //   this.authenticationStorageService.registration(this.registrationForm.value).subscribe(
  //     (response: any) => {
  //       this.message.add({ severity: 'success', summary: 'Success', detail: response.message });

  //       this.router.navigate(['/login']);
  //     },
  //     (err) => {
  //       this.message.add({ severity: 'error', summary: 'Error', detail: err.error.message });
  //     }
  //   );
  //   this.router.navigate(['/login']);
  // }

  submitForm() {
    this.authenticationStorageService.registration(this.registrationForm.value).subscribe({
      next: (response: any) => {
        this.message.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'An unexpected error occurred';
        this.message.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      },
      complete: () => {
        console.log('Registration completed');
      }
    });
  }


  validateConfirmPassword(): void {
    setTimeout(() =>
      this.registrationForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.registrationForm.controls['password'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  resetForm(): void {
    this.registrationForm.reset();
    for (const key of Object.keys(this.registrationForm.controls)) {
      this.registrationForm.controls[key].markAsPristine();
      this.registrationForm.controls[key].updateValueAndValidity();
    }
  }

}
