import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import {Driver} from '../../models/Driver';
import {FormArray} from '@angular/forms';

@Injectable()
export class DriverService {

  constructor(private http: HttpClient) { }

  getAllDrivers(): Promise<any> {
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8081/drivers/', {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addDriver(driver: Driver): Promise<any> {
    const url = 'http://localhost:8081/drivers/';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, driver, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateDriver(id: number, driver: Driver): Promise<any> {
    const url = 'http://localhost:8081/drivers/' + id;
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.put(url, driver, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateAllDrivers(array: FormArray): Promise<any> {
    const promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(this.updateDriver(array[i].id, array[i]));
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

  deleteDriver(id: number): Promise<any> {
    const url = 'http://localhost:8081/drivers/' + id;
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.delete(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteAllDrivers(array: any) {
    const promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(this.deleteDriver(array[i].id));
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

}
