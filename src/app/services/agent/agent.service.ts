import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import {Agent} from '../../models/Agent';

@Injectable()
export class AgentService {
  constructor(private http: HttpClient) {
  }

  getAllAgents(): Promise<any> {
    const url = 'http://localhost:8081/agents/';
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAgentById(id: number): Promise<any> {
    const url = 'http://localhost:8081/agents/' + id;
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addAgent(agent: Agent): Promise<any> {
    const url = 'http://localhost:8081/agents/';
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.post(url, agent, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateAgent(id: number, agent: Agent): Promise<any> {
    const url = 'http://localhost:8081/agents/' + id;
    const headers = new HttpHeaders({Authorization: Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.put(url, agent, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteAgent(id: number): Promise<any> {
    const url = 'http://localhost:8081/agents/' + id;
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

  deleteAllAgents(array: Agent[]) {
    /*return new Promise((resolve, reject) => {
      Promise.all([this.deleteAgent(1), this.deleteAgent(2)]).then(res => {
        res.
      })
    })
  }*/
  }
}
