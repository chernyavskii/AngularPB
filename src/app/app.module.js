"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var xhr_interceptor_1 = require('./utils/xhr-interceptor');
var http_1 = require('@angular/common/http');
var user_service_1 = require('./services/user.service');
var login_component_1 = require('./components/index/login/login.component');
var forms_1 = require('@angular/forms');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var http_2 = require('@angular/http');
var ng2_cookies_1 = require('ng2-cookies');
var AuthGuard_1 = require('./utils/AuthGuard');
var auth_service_1 = require('./services/auth/auth.service');
var update_form_component_1 = require('./components/dashboard/update-form/update-form.component');
var material_1 = require('@angular/material');
var animations_1 = require('@angular/platform-browser/animations');
var registration_component_1 = require('./components/index/registration/registration.component');
var app_routing_1 = require('./app.routing');
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
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                update_form_component_1.UpdateFormComponent,
                registration_component_1.RegistrationComponent
            ],
            imports: [
                app_routing_1.routing,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                /*
                    RouterModule.forRoot(routes),
                */
                http_1.HttpClientModule,
                http_2.HttpModule,
                forms_1.ReactiveFormsModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatToolbarModule,
                material_1.MatFormFieldModule,
                material_1.MatSelectModule,
                material_1.MatProgressSpinnerModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatInputModule,
                material_1.MatButtonModule,
                material_1.MatSidenavModule,
                material_1.MatStepperModule,
                material_1.MatSnackBarModule
            ],
            providers: [user_service_1.UserService, auth_service_1.AuthService, ng2_cookies_1.CookieService, AuthGuard_1.AuthGuard, { provide: http_1.HTTP_INTERCEPTORS, useClass: xhr_interceptor_1.XhrInterceptor, multi: true }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map