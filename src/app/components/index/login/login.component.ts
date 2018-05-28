import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Error} from "../../../models/Error";
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

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


  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute,
              private snackBar:MatSnackBar,
              private fb: FormBuilder) {
   /* this.loginFormGroup = this.fb.group({
      username: new FormControl()
    });*/
  }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.userService.login(this.model)
      .then(data => {
        this.snackBar.open('Вход успешно выполнен', 'Закрыть', {
          duration: 3000
        });
        this.router.navigateByUrl(this.returnURL);
      })
      .catch(err => {
        this.error.message = err.error.message;
      });
  }
}
