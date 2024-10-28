import { Routes } from '@angular/router';
import { RegisterComponent } from './accounts/register.component';
import { LoginComponent } from './accounts/login.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];