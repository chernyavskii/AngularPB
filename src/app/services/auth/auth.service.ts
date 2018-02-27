import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import {User} from '../../models/User';

@Injectable()
export class AuthService {

  constructor(private cookie: CookieService) { }
  credentials = atob(this.cookie.get('currentUser'));
  currentUser = new User();
  _username: string;
  _password: string;

  getAuth() {
    if (this.credentials) {
      return true;
    }
    return false;
  }

  setAuth(credentials) {
    return this.cookie.set('currentUser', btoa(credentials));
  }

  getUserId() {
    let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
    return this.currentUser.id = parseUser.id;
  }

  getUsername() {
    console.log("qqq");
    let ck = atob(this.cookie.get('currentUser'));
    if (ck) {
      console.log("qqqdqwqeeqweqweqwsada");

      let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
      return this._username = parseUser.username;
    }
    console.log("qqqdsada");
    return null;
  }

  getPassword(): string {
 /*   let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
/!*
    this.currentUser.password = parseUser.password;
*!/
    return this._password = parseUser.password;*/
    console.log("qqq");
    let ck = atob(this.cookie.get('currentUser'));
    if (ck) {

      let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
      return this._password = parseUser.password;
    }

    return null;
  }
}
