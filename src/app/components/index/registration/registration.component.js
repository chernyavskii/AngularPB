"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var User_1 = require('../../../models/User');
var RegistrationComponent = (function () {
    function RegistrationComponent(userService, router, _formBuilder, snackBar) {
        this.userService = userService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.snackBar = snackBar;
        this.user = new User_1.User();
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            username: this.user.username,
            password: this.user.password
        });
        this.secondFormGroup = this._formBuilder.group({
            firstName: this.user.firstName,
            middleName: this.user.middleName,
            lastName: this.user.lastName
        });
        this.thirdFormGroup = this._formBuilder.group({
            unp: this.user.unp,
            organization: this.user.organization,
            position: this.user.position,
            address: this.user.address,
            rs: this.user.rs,
            ks: this.user.ks,
            bank: this.user.bank,
            bik: this.user.bik,
            phone: this.user.phone
        });
    };
    RegistrationComponent.prototype.registration = function () {
        var _this = this;
        var saveUser = {
            id: null,
            username: this.firstFormGroup.value.username,
            password: this.firstFormGroup.value.password,
            firstName: this.secondFormGroup.value.firstName,
            middleName: this.secondFormGroup.value.middleName,
            lastName: this.secondFormGroup.value.lastName,
            unp: this.thirdFormGroup.value.unp,
            organization: this.thirdFormGroup.value.organization,
            position: this.thirdFormGroup.value.position,
            address: this.thirdFormGroup.value.address,
            rs: this.thirdFormGroup.value.rs,
            ks: this.thirdFormGroup.value.ks,
            bank: this.thirdFormGroup.value.bank,
            bik: this.thirdFormGroup.value.bik,
            phone: this.thirdFormGroup.value.phone
        };
        this.userService.registration(saveUser)
            .then(function (res) {
            if (res) {
                var snackBarRef = _this.snackBar.open('Регистрация прошла успешно');
                var loginRoute = _this.router.navigateByUrl('login');
            }
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.css']
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map