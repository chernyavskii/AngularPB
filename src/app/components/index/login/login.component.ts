import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'ng2-cookies';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  user = new User();
  testUser = new User();
  returnURL: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService) {
/*
    this.userService.isAuthenticated();
*/
  }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
  console.log("comp " + JSON.stringify(this.model));
    this.userService.login(this.model)
      .then(data => {
/*
          this.cookieService.set('currentUser', btoa(JSON.stringify(data)));
*/
          this.router.navigateByUrl(this.returnURL);
        },
        error => {
          console.log(error);
        });
  }

  authenticated() {
    return this.authService.getAuth();
  }


}
