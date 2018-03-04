import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { XhrInterceptor } from './utils/xhr-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/index/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ng2-cookies';
import { AuthGuard } from './utils/AuthGuard';
import { AuthService } from './services/auth/auth.service';
import { UpdateFormComponent } from './components/dashboard/update-form/update-form.component';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldControl, MatFormFieldModule, MatSelectModule, MatToolbarModule,
  MatProgressSpinnerModule, MatInputModule, MatSidenavModule, MatStepperModule, MatSnackBarModule,
  MatButtonToggleModule, MatIconModule, MatExpansionModule, MatListModule 
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/index/registration/registration.component';
import {routing} from './app.routing';
import { TestComponent } from './components/dashboard/test/test.component';


/*const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
];*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UpdateFormComponent,
    RegistrationComponent,
    TestComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
/*
    RouterModule.forRoot(routes),
*/
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [UserService, AuthService, CookieService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
