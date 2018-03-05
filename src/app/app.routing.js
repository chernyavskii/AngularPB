"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/index/login/login.component');
var registration_component_1 = require('./components/index/registration/registration.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var AuthGuard_1 = require('./utils/AuthGuard');
var appRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [AuthGuard_1.AuthGuard],
        children: [
            { path: 'qwerty', component: registration_component_1.RegistrationComponent }
        ]
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: registration_component_1.RegistrationComponent },
    { path: '**', redirectTo: '/login' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map