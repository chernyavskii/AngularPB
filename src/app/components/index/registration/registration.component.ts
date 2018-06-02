import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
  /*const isSubmitted = form && form.submitted;*/
  return !!(control && control.invalid && (control.dirty || control.touched ));
}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isLinear = true;
  step = 0;
  position = 'before';
  user: User = new User();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  hide = true;

  @Output() newUserEvent = new EventEmitter();

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(9)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(9)])
    });

    this.secondFormGroup = this._formBuilder.group({
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      middleName: new FormControl(this.user.middleName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")])
    });

    this.thirdFormGroup = this._formBuilder.group({
      unp: new FormControl(this.user.unp, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
      organization: new FormControl(this.user.organization, [Validators.required]),
      position: new FormControl(this.user.position, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      rs: new FormControl(this.user.rs, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
      ks: new FormControl(this.user.ks, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
      bank: new FormControl(this.user.bank, [Validators.required]),
      bik: new FormControl(this.user.bik, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern("(\\+375 (25|29|33|44) ([0-9]{3}( [0-9]{2}){2}))")]),
    });
  }

  registration() {
    const saveUser: any = {
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
      phone: this.thirdFormGroup.value.phone,
      confirmPassword: this.firstFormGroup.value.confirmPassword
    };
    this.userService.registration(saveUser)
      .then(res => {
        if (res) {
          this.snackBar.open('Регистрация прошла успешно', 'Закрыть', {
            duration: 3000
          });
          this.newUserEvent.emit(this.user);
          this.router.navigate(['dashboard']);
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
