import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as blobUtil from 'blob-util';
import * as FileSaver from 'file-saver';
import {Product} from '../../models/Product';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) { }

  getAllDocuments(): Promise<any> {
/*
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
*/
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/', /*{headers: headers}*/).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  convertExcelToPdf(filename: string, type: string, file: string): Promise<any> {
    const url = 'https://v2.convertapi.com/' + type + '/to/pdf?Secret=52S0t7G5mBiScc9K';
    const body = { Parameters: [{ Name: 'File', FileValue: { Name: filename, Data: file } }]};
    return new Promise((resolve, reject) => {
      this.http.post(url, body).toPromise()
        .then(data => {
          blobUtil.base64StringToBlob(data['Files'][0].FileData)
            .then(blob => {
              resolve(blob);
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

  convertExcelToPng(filename: string, type: string, file: string): Promise<any> {
    const url = 'https://v2.convertapi.com/' + type + '/to/png?Secret=52S0t7G5mBiScc9K';
    const body = { Parameters: [{ Name: 'File', FileValue: { Name: filename, Data: file } }]};
    return new Promise((resolve, reject) => {
      this.http.post(url, body).toPromise()
        .then(data => {
          resolve(data['Files'][0].FileData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getDocumentByIdInPDF(id: number, filename: string, type: string): Promise<any> {
    const url = 'http://localhost:8081/documents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToBase64String(response)
            .then(base64String => {
              this.convertExcelToPdf(filename, type, base64String)
                .then(blob => {
                  FileSaver.saveAs(new Blob([blob]), filename + '.pdf');
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getDocumentByIdInExcel(id: number, filename: string, type: string): Promise<any> {
/*
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
*/
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/documents/' + id, {/*headers: headers,*/ responseType: 'blob'}).toPromise()
        .then(response => {
          FileSaver.saveAs(new Blob([response]), filename + '.' + type);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  showDocumentInPdf(id: number, filename: string, type: string): Promise<Uint8Array> {
    const url = 'http://localhost:8081/documents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToBase64String(response)
            .then((base64String) => {
              this.convertExcelToPdf(filename, type, base64String)
                .then(blob => {
                  blobUtil.blobToArrayBuffer(blob)
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

  showDocumentInPng(id: number, filename: string, type: string): Promise<Uint8Array> {
    const url = 'http://localhost:8080/documents/' + id;
/*
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
*/
    return new Promise((resolve, reject) => {
      this.http.get(url, {/*headers: headers,*/ responseType: 'blob'}).toPromise()
        .then(response => {
          blobUtil.blobToBase64String(response)
            .then((base64String) => {
              this.convertExcelToPng(filename, type, base64String)
                .then(blob => {
                  resolve(blob);
                })
                .catch(error => {
                  reject(error);
                });
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

  printDocument(id: number, filename: string, type: string): Promise<any> {
    const url = 'http://localhost:8081/documents/' + id;
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers, responseType: 'blob'}).toPromise()
        .then((response) => {
          blobUtil.blobToBase64String(response)
            .then((base64String) => {
              this.convertExcelToPdf(filename, type, base64String)
                .then(blob => {
                  const blobUrl = URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}));
                  const iframe = document.createElement('iframe');
                  iframe.style.display = 'none';
                  iframe.src = blobUrl;
                  document.body.appendChild(iframe);
                  iframe.contentWindow.print();
                })
                .catch(error => {
                  reject(error);
                });
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

  addDocumentTN(agent_id: number, products: Product[]): Promise<any> {
    const url = 'http://localhost:8081/documents/tn';
    const body = {agent_id: agent_id, products: products};
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
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


  deleteDocument(id: number): Promise<any> {
    const url = 'http://localhost:8080/documents/' + id;
/*
    const headers = new HttpHeaders({ Authorization : Cookie.get('token'), 'Content-Type': 'application/json'});
*/
    return new Promise((resolve, reject) => {
      this.http.delete(url, /*{headers: headers}*/).toPromise()
        .then(response => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
