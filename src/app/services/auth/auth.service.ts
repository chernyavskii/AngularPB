import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import {User} from '../../models/User';

@Injectable()
export class AuthService {

  constructor(private cookie: CookieService) { }
  credentials = atob(this.cookie.get('currentUser'));
  currentUser = new User();

  getAuth() {
    if (this.credentials) {
      return true;
    }
    return false;
  }

  setAuth(credentials) {
    return this.cookie.set('currentUser', btoa(credentials));
  }

  getTestPass() {
    let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));

    return this.currentUser.password;
  }

  getUserId() {
    let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
    return this.currentUser.id = parseUser.id;
  }

}
