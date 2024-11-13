import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: 'registration',component: RegistrationComponent,},
];

export const AuthenticationRoutes = RouterModule.forChild(routes);
