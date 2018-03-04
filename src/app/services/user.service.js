"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/common/http');
var User_1 = require('../models/User');
var app_component_1 = require('../app.component');
require('rxjs/add/operator/map');
var UserService = (function () {
    function UserService(http, router, cookie, authService, cookieService) {
        this.http = http;
        this.router = router;
        this.cookie = cookie;
        this.authService = authService;
        this.cookieService = cookieService;
        this.loginURL = 'http://localhost:8081/login';
        this.usersURL = 'http://localhost:8081/users';
        this.resourceURL = 'http://localhost:8081/';
        this.agentsURL = 'http://localhost:8081/agents/';
        this.isLoggedIn = false;
        /*findById(id): Promise<any> {
          id = this.authService.getUserId();
          return new Promise((resolve, reject) => {
            this.http
              .get(`${this.usersURL}/${id}`)
              .toPromise()
              .then(result => {
                console.log(result);
                resolve(result);
              })
              .catch(error => reject(error));
          });
        }*/
        this.user = new User_1.User();
    }
    UserService.prototype.login = function (user) {
        var _this = this;
        console.log(user.username);
        this.user.username = user.username;
        this.user.password = user.password;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
                    ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
                    ' Access-Control-Request-Headers'
            });
            _this.http
                .get(app_component_1.AppComponent.API_URL + '/login', { headers: headers, withCredentials: true }) //// withCredentials: true
                .toPromise()
                .then(function (result) {
                localStorage.setItem('currentUser', JSON.stringify(result));
                _this.router.navigate(['/dashboard']);
                resolve(result);
            })
                .catch(function (error) {
                console.log(JSON.stringify(error));
            });
        });
    };
    /*updateById(id: number, user: User): Promise<any> {
      id = this.authService.getUserId();
      return new Promise((resolve, reject) => {
        this.http
          .put(`${this.usersURL}/${id}`, user)
          .toPromise()
          .then( result => resolve(result))
          .catch(error => reject(error));
      });
    }*/
    UserService.prototype.registration = function (user) {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
                ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
                ' Access-Control-Request-Headers' });
        return new Promise(function (resolve, reject) {
            _this.http
                .post(app_component_1.AppComponent.API_URL + '/registration', user, { headers: headers })
                .toPromise()
                .then(function (result) { return resolve(result); })
                .catch(function (error) { return reject(error); });
        });
    };
    UserService.prototype.testFindAll = function () {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
                ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
                ' Access-Control-Request-Headers'
        });
        return new Promise(function (resolve, reject) {
            _this.http
                .get(_this.agentsURL)
                .toPromise()
                .then(function (result) {
                console.log(JSON.stringify(result));
            })
                .catch(function (err) {
                console.log(JSON.stringify(err));
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map