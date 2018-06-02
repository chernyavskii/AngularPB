import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as blobUtil from 'blob-util';
import * as FileSaver from 'file-saver';
import {Product} from '../../models/Product';
import {Cookie} from 'ng2-cookies';
import {Work} from '../../models/Work';
import {FormArray} from '@angular/forms';
import {Error} from "../../models/Error";

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

  getSharedDocumentByIdInExcel(id: number): Promise<any> {
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8081/sharing/' + id, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  showPdf(id: number): Promise<Uint8Array> {
    const url = 'http://localhost:8081/sharing/' + id + '?type=pdf';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToArrayBuffer(response)
            .then(arrayBuff => {
              resolve(new Uint8Array(arrayBuff));
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  showPng(id: number): Promise<Uint8Array> {
    const url = 'http://localhost:8081/sharing/' + id + '?type=png';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToBase64String(response)
            .then((base64String) => {
              resolve(base64String);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  downloadExcel(id: number, filename: string, type: string): Promise<any> {
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8081/sharing/' + id, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          FileSaver.saveAs(new Blob([response]), filename + '.' + type);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  downloadPDF(id: number, filename: string): Promise<any> {
    const url = 'http://localhost:8081/sharing/' + id + '?type=pdf';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          FileSaver.saveAs(new Blob([response]), filename + '.pdf');
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  printDocument(id: number): Promise<any> {
    const url = 'http://localhost:8081/sharing/' + id + '?type=pdf';
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then((response) => {
          const blobUrl = URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
