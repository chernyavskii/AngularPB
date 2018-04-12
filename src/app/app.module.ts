import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {XhrInterceptor} from './utils/xhr-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {LoginComponent} from './components/index/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HttpModule} from '@angular/http';
import {CookieService} from 'ng2-cookies';
import {AuthGuard} from './utils/AuthGuard';
import {AuthService} from './services/auth/auth.service';
import {UpdateFormComponent} from './components/dashboard/profile/update-form/update-form.component';

import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatToolbarModule,
  MatProgressSpinnerModule, MatInputModule, MatSidenavModule, MatStepperModule, MatSnackBarModule,
  MatButtonToggleModule, MatIconModule, MatExpansionModule, MatListModule, MatTabsModule, MatMenuModule, MatTooltipModule,
  MatProgressBarModule, MatSlideToggleModule, MatGridListModule, MatDialogModule, MatTableModule, MatSortModule, MatAutocompleteModule,
  MatPaginatorModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {RegistrationComponent} from './components/index/registration/registration.component';
import {routing} from './app.routing';
import {ProfileComponent} from './components/dashboard/profile/profile.component';
import {ChangePasswordComponent} from './components/dashboard/profile/change-password/change-password.component';
import {DocumentsComponent} from './components/dashboard/documents/documents.component';
import {DocumentService} from './services/document/document.service';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {AgentService} from './services/agent/agent.service';
import {AddFormComponent} from './components/dashboard/documents/add-form/add-form.component';
import {AgentsComponent} from './components/dashboard/agents/agents.component';
import {AddFormUtils} from './components/dashboard/documents/add-form/add-form-utils';
import {DriverService} from './services/driver/driver.service';
import {UpdateAgentComponent} from './components/dashboard/agents/update-agent/update-agent.component';
import {DeleteAgentComponent} from './components/dashboard/agents/delete-agent/delete-agent.component';
import {AddAgentComponent} from './components/dashboard/agents/add-agent/add-agent.component';
import {DocumentDetailComponent} from './components/dashboard/documents/document-detail/document-detail.component';
import {DriversComponent} from './components/dashboard/drivers/drivers.component';
import {AddDriverComponent} from './components/dashboard/drivers/add-driver/add-driver.component';
import {DeleteDriverComponent} from './components/dashboard/drivers/delete-driver/delete-driver.component';
import {UpdateDriverComponent} from './components/dashboard/drivers/update-driver/update-driver.component';
import {AdminComponent} from './components/admin/admin.component';
import {UtilsComponent} from './components/utils/utils.component';
import {UsersComponent} from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { UpdateUserComponent } from './components/admin/users/update-user/update-user.component';
import { DeleteUserComponent } from './components/admin/users/delete-user/delete-user.component';
import { MessageComponent } from './components/admin/message/message.component';
import {MessageService} from './services/message/message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UpdateFormComponent,
    RegistrationComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DocumentsComponent,
    PdfViewerComponent,
    AddFormComponent,
    AgentsComponent,
    UpdateAgentComponent,
    DeleteAgentComponent,
    AddAgentComponent,
    DocumentDetailComponent,
    DriversComponent,
    AddDriverComponent,
    DeleteDriverComponent,
    UpdateDriverComponent,
    AdminComponent,
    UtilsComponent,
    UsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    MessageComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
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
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  providers: [UserService, DriverService, AgentService, DocumentService, AuthService, CookieService, MessageService, AuthGuard, AddFormUtils /*{ provide: HTTP_INTERCEPTORS /!*useClass: XhrInterceptor, multi: true*!/ }*/],
  bootstrap: [AppComponent]
})

export class AppModule {
}
