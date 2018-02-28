import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Router} from '@angular/router';
import { CookieService } from 'ng2-cookies';
import {AuthService} from './auth/auth.service';

@Injectable()
export class UserService {
  private loginURL = 'http://localhost:8081/login';
  private usersURL = 'http://localhost:8081/users';
  private resourceURL = 'http://localhost:8081/';


  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient,
              private router: Router,
              private cookie: CookieService,
              private authService: AuthService) { }

  findById(id): Promise<any> {
    id = this.authService.getUserId();
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.usersURL}/${id}`)
        .toPromise()
        .then(result => {
          resolve(result);
        })
        .catch(error => reject(error));
    });
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
        .then(result => {
          resolve(result);
        })
        .catch(error => reject(error));
    });
  }

  updateById(id: number, user: User): Promise<any> {
    id = this.authService.getUserId();
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.usersURL}/${id}`, user)
        .toPromise()
        .then( result => resolve(result))
        .catch(error => reject(error));
    });
  }

  registration(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.resourceURL + 'registration', user)
        .toPromise()
        .then( result => resolve(result))
        .catch(error => reject(error));
    });
  }
}
