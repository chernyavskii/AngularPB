"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/do');
var XhrInterceptor = (function () {
    function XhrInterceptor(authService, cookieService) {
        this.authService = authService;
        this.cookieService = cookieService;
    }
    XhrInterceptor.prototype.intercept = function (req, next) {
        console.log(req.url);
        /* if (req.url === 'http://localhost:4200/login') {
           console.log('qqq');
         } else {*/
        var xhr = req.clone({
            headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
                .set('Access-Control-Allow-Origin', '*')
                .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
                .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,' +
                ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
                ' Access-Control-Request-Headers')
        });
        return next.handle(xhr);
    };
    XhrInterceptor = __decorate([
        core_1.Injectable()
    ], XhrInterceptor);
    return XhrInterceptor;
}());
exports.XhrInterceptor = XhrInterceptor;
//# sourceMappingURL=xhr-interceptor.js.map