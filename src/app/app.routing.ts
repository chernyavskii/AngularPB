import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/index/login/login.component';
import {RegistrationComponent} from './components/index/registration/registration.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './utils/AuthGuard';
import {ProfileComponent} from './components/dashboard/profile/profile.component';
import {UpdateFormComponent} from './components/dashboard/profile/update-form/update-form.component';
import {DestroyFormComponent} from './components/dashboard/profile/destroy-form/destroy-form.component';
import {ChangePasswordComponent} from './components/dashboard/profile/change-password/change-password.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard],
    children:
      [
        { path: 'profile', component: ProfileComponent,
          children: [
            { path: 'u', component: UpdateFormComponent },
            { path: 'd', component: DestroyFormComponent },
            { path: 'c', component: ChangePasswordComponent}
          ]
        },
      ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
