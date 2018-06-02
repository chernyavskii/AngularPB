import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {AppComponent} from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {FormArray} from '@angular/forms';

@Injectable()
export class UserService {
  private loginURL = 'http://195.133.73.1:8080/blanks/api/v1/login/';
  private usersURL = 'http://localhost:8081/users/';
  private resourceURL = 'http://localhost:8081/';
  private agentsURL = 'http://localhost:8081/agents/';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
      this.http.get(this.usersURL, {headers: headers}).toPromise()
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

 /* login(user: User): Promise<any> {
    Cookie.delete('token');
    localStorage.clear();
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
        'X-Requested-With': 'XMLHttpRequest'
      });
      this.http
        .get(AppComponent.API_URL + '/login', {headers: headers})
        .toPromise()
        .then(result => {
          Cookie.set('token', 'Basic ' + btoa(user.username + ':' + user.password));
          localStorage.setItem('currentUser', JSON.stringify(result));

          resolve(result);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    });
  }*/

  login(user: User): Promise<any> {
    Cookie.set('token', '');
    Cookie.delete('token');
    Cookie.deleteAll();
    localStorage.clear();
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
        ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
        ' Access-Control-Request-Headers'
      });

      this.http
        .post(this.loginURL, user, {headers: headers})
        .toPromise()
        .then(result => {
          Cookie.set('token', 'Basic ' + btoa(user.username + ':' + user.password));
          localStorage.setItem('currentUser', JSON.stringify(result));

          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateUser(id: number, user: User, role: string): Promise<any> {
    const url = 'http://localhost:8081/users/' + id;
    const body_ = {user: user, role: role}
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.put(url, body_, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateAllUsers(array: FormArray): Promise<any> {
    const promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(this.updateUser(array[i].id, array[i], array[i].role));
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  registration(user: User): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,' +
      ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
      ' Access-Control-Request-Headers'
    });
    Cookie.set('token', '');
    Cookie.deleteAll();
    Cookie.delete('token');
    localStorage.clear();
    return new Promise((resolve, reject) => {
      this.http
        .post(AppComponent.API_URL + '/registration', user, {headers: headers})
        .toPromise()
        .then(result => {
          localStorage.setItem('currentUser', JSON.stringify(result));
          resolve(result);
        })
        .catch(error => reject(error));
    });
  }

  changePassword(passwordCredentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
      this.http
        .put(`${this.usersURL}` + '/password', passwordCredentials, {headers: headers})
        .toPromise()
        .then(result => {
          localStorage.clear();
          localStorage.setItem('currentUser', JSON.stringify(result));
          Cookie.delete('token');
          const userObject: User = <User>result;
          Cookie.set('token', 'Basic ' + btoa(userObject.username + ':' + passwordCredentials.newPassword));
          resolve(result);
        })
        .catch(error => reject(error));
    });
  }

  deleteUser(id: number): Promise<any> {
    const url = 'http://localhost:8081/users/' + id;
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.delete(url, {headers: headers}).toPromise()
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteAllUsers(array: any) {
    const promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(this.deleteUser(array[i].id));
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addUser(user: User, role: string): Promise<any> {
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'});

    const body = {user: user, role: role};
    return new Promise((resolve, reject) => {
      this.http
        .post(AppComponent.API_URL + '/users/', body, {headers: headers})
        .toPromise()
        .then(result => {
          resolve(result);
        })
        .catch(error => reject(error));
    });
  }

  logOut() {
    Cookie.delete('token');
    Cookie.set('token', '');
    Cookie.deleteAll();
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
