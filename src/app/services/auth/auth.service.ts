import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import {User} from '../../models/User';
import {HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private cookie: CookieService) { }
  credentials = atob(this.cookie.get('currentUser'));
  currentUser = new User();

  cachedRequests: Array<HttpRequest<any>> = [];

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

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

  getUsernameTest() {
    let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
    console.log('ppp'  + JSON.stringify(parseUser.username));
    return JSON.stringify(parseUser.username);
  }

  getPasswordTest() {
    let parseUser = JSON.parse(atob(this.cookie.get('currentUser')));
    return JSON.stringify(parseUser.password);
  }

  getTestToken() {
    let token_ = this.cookie.get('testToken');
    console.log(token_);
    let aqewq = decodeURIComponent(atob(token_).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(aqewq);
    return aqewq;
     }


}
