import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Error} from "../../../models/Error";
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any = {username: '', password: ''};
  returnURL:string;
  error = new Error('','',null);
  hide: any;
  loginFormGroup: FormGroup;

  verify = false;

  constructor(private userService:UserService,
              public router:Router,
              public route:ActivatedRoute,
              private snackBar:MatSnackBar,
              private fb: FormBuilder) {
   /* this.loginFormGroup = this.fb.group({
      username: new FormControl()
    });*/
  }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(localStorage.getItem('currentUser') && Cookie.get('token')) {
      this.verify = true;
    }
  }

  login() {
    this.userService.login(this.model)
      .then(data => {
        this.route.queryParams.subscribe(val => {
          if(val.returnUrl === '/admin' && data.roles[0].name === 'ROLE_USER') {
            this.snackBar.open('Вы не имеете прав для достпа к Панели Администратора', 'Закрыть', {
              duration: 3000
            });
          }
          else {
            this.snackBar.open('Вход успешно выполнен', 'Закрыть', {
              duration: 3000
            });
            this.router.navigateByUrl(this.returnURL);
          }
        });
      })
      .catch(err => {
        this.error.message = err.error.message;
      });
  }
}
