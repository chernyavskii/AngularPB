import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/index/login/login.component';
import {RegistrationComponent} from './components/index/registration/registration.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './utils/AuthGuard';
import { UpdateFormComponent } from './components/dashboard/update-form/update-form.component';
import { TestComponent } from './components/dashboard/test/test.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', redirectTo: '/login' }

];

export const routing = RouterModule.forRoot(appRoutes);
