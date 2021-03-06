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
import {UpdateFormComponent} from './components/dashboard/profile/update-form/update-form.component';
import {MatChipsModule} from '@angular/material/chips';

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
import { PdfViewerModule } from 'ng2-pdf-viewer';
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
import { AdminAgentsComponent } from './components/admin/admin-agents/admin-agents.component';
import { AdminDriversComponent } from './components/admin/admin-drivers/admin-drivers.component';
import { AdminDocumentsComponent } from './components/admin/admin-documents/admin-documents.component';
import { DeleteDocumentComponent } from './components/dashboard/documents/delete-document/delete-document.component';
import { DialogAgentComponent } from './components/dashboard/agents/dialog-agent/dialog-agent.component';
import { DialogDriverComponent } from './components/dashboard/drivers/dialog-driver/dialog-driver.component';
import {ShareService} from "./services/share/share.service";
import { PageNotFoundComponent } from './components/index/pageNotFound/page-not-found/page-not-found.component';
import { AdminSharedDocumentsComponent } from './components/admin/admin-shared-documents/admin-shared-documents.component';
import { AdminAgentsUpdateComponent } from './components/admin/admin-agents/admin-agents-update/admin-agents-update.component';
import { AdminDriversUpdateComponent } from './components/admin/admin-drivers/admin-drivers-update/admin-drivers-update.component';
import { DialogUserComponent } from './components/admin/users/dialog-user/dialog-user.component';
import { DialogProfileComponent } from './components/dashboard/profile/dialog-profile/dialog-profile.component';
import { DialogDocumentsComponent } from './components/dashboard/documents/dialog-documents/dialog-documents.component';

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
    AdminAgentsComponent,
    AdminDriversComponent,
    AdminDocumentsComponent,
    DeleteDocumentComponent,
    DialogAgentComponent,
    DialogDriverComponent,
    PageNotFoundComponent,
    AdminSharedDocumentsComponent,
    AdminAgentsUpdateComponent,
    AdminDriversUpdateComponent,
    DialogUserComponent,
    DialogProfileComponent,
    DialogDocumentsComponent
    /*
    PdfViewerComponent
*/
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
    MatPaginatorModule,
    MatChipsModule,
    PdfViewerModule
  ],
  entryComponents: [DialogAgentComponent, DialogDriverComponent, DialogUserComponent, DialogProfileComponent, DialogDocumentsComponent, UtilsComponent],
  providers: [UserService, DriverService, ShareService, AgentService, DocumentService, CookieService, AuthGuard, AddFormUtils /*{ provide: HTTP_INTERCEPTORS /!*useClass: XhrInterceptor, multi: true*!/ }*/],
  bootstrap: [AppComponent]
})

export class AppModule {
}
