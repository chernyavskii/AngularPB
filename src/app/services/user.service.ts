import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  private loginURL = 'http://localhost:8081/login';  // URL to web api
  private pingURL = 'http://localhost:8081';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
    ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
    ' Access-Control-Request-Headers'
  });

  constructor(private http: HttpClient, private router: Router) { ///// PING ??????????????????????
    this.http.get(this.pingURL, {headers: this.headers.set('Authorization', 'Basic ' + btoa(undefined + ':' + undefined))});
  }

  login(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
        ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
        ' Access-Control-Request-Headers'
      });
      this.http
        .get(this.loginURL, {headers: headers})
        .toPromise()
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

}
