import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/index/login/login.component';
import {RegistrationComponent} from './components/index/registration/registration.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './utils/AuthGuard';
import {ProfileComponent} from './components/dashboard/profile/profile.component';
import {DocumentsComponent} from './components/dashboard/documents/documents.component';
import {AgentsComponent} from './components/dashboard/agents/agents.component';
import {DriversComponent} from './components/dashboard/drivers/drivers.component';
import {AddFormComponent} from './components/dashboard/documents/add-form/add-form.component';
import {AdminComponent} from './components/admin/admin.component';
import {PageNotFoundComponent} from "./components/index/pageNotFound/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children:
      [
        {path: 'profile', component: ProfileComponent},
        {path: 'documents', component: DocumentsComponent},
        {path: 'new', component: AddFormComponent},
        {path: 'agents', component: AgentsComponent},
        {path: 'drivers', component: DriversComponent}
      ]
  },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: '', redirectTo: '/dashboard/new', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(appRoutes);
