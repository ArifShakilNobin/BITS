import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/component/landing/landing.component';
import { DefaultLayoutComponent } from './shared/modules/default-layout/default-layout.component';
import { AuthenticationGuard } from './modules/authentication/services/authentication.guard';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { RegistrationComponent } from './modules/authentication/components/registration/registration.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {path:'dashboard', component:DashboardComponent},

  {
    path: 'home',
    component: DefaultLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'authentication',loadChildren: () =>import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),},
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
