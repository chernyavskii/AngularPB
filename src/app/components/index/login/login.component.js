"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var User_1 = require('../../../models/User');
var LoginComponent = (function () {
    function LoginComponent(authService, userService, router, route, cookieService) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.cookieService = cookieService;
        this.model = {};
        this.user = new User_1.User();
        this.testUser = new User_1.User();
        /*
            this.userService.isAuthenticated();
        */
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        this.userService.login(this.model)
            .then(function (data) {
            console.log(data);
            /*
                      this.router.navigate(['/dashboard']);
            */
        }, function (error) {
            console.log(error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map