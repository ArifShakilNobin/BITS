import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingModule } from '../landing/landing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationRoutes } from './Authentication.routing';
import { PrimeNgModule } from '../../primng.module';
import { AuthInterceptor } from '../../shared/services/http-interceptors/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutes,
    PrimeNgModule,
    LandingModule,


  ],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AuthenticationModule { }
