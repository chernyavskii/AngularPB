import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  testUser = new User();

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.user).then(res => {
      console.log(res);
      this.router.navigateByUrl('/dashboard');
      this.cookieService.set('principal', res);
      console.log(this.cookieService.get("principal"));
      this.cookieService.set('qqq', btoa(JSON.stringify(this.user)));
      console.log(atob(this.cookieService.get('qqq')));
      var tes = JSON.parse(atob(this.cookieService.get('qqq')));
      console.log(tes.username);
      console.log(tes.password);
      this.testUser.username = tes.username;
      this.testUser.password = tes.password;
      console.log(this.testUser);

      })
      .catch(err =>  this.router.navigateByUrl('/login'));
   }
}
