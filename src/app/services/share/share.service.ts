import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class ShareService {

  constructor(private http: HttpClient) { }

  shareDocument(agentId: number, documentId: number): Promise<any> {
    const url = 'http://localhost:8081/sharing/';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    const body = {agent_id: agentId, document_id: documentId};

    return new Promise((resolve, reject) => {
      this.http.post(url, body, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAllSharedDocuments(): Promise<any> {
    const url = 'http://localhost:8081/sharing/';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
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

  deleteSharedDocument(id: number): Promise<any> {
    const url = 'http://localhost:8081/sharing/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.delete(url, {headers: headers}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}
