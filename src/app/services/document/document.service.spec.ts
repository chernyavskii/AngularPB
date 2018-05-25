import {TestBed, inject} from '@angular/core/testing';
import {DocumentService} from './document.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Document} from "../../models/Document";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from 'ng2-cookies';

describe('сервис DocumentService', () => {
  let documentService:DocumentService;
  let httpMock:HttpTestingController;
  let cookieMock:CookieService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentService, CookieService]
    });

    documentService = TestBed.get(DocumentService);
    httpMock = TestBed.get(HttpTestingController);
    cookieMock = TestBed.get(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
    cookieMock.set('token', '');
  });

  it('- Получение списка всех документов', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedDocuments:Document[] = [
      {id: 1, name: 'testName', type: 'testType', date: 'testDate'}
    ];

    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    documentService.getAllDocuments().then(documents => {
      expect(documents.length).toBe(1);
      expect(documents).toEqual(expectedDocuments);
    });

    const request = httpMock.expectOne('http://localhost:8081/documents/');
    expect(request.request.method).toBe('GET');
    request.flush(expectedDocuments);
  });

  it('- Получение списка всех документов без прав доступа', () => {
    documentService.getAllDocuments().catch(err => {
      console.log(err);
      expect(err.message).toEqual('Unauthorized user');
      expect(err.status).toEqual('401 Unauthorized');
      expect(err.code).toEqual(401);
    });
  });

  it('- Получение списка всех документов, если получено исклюение от сервера', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    documentService.getAllDocuments().catch(err => {
      expect(err).not.toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:8081/documents/');
    expect(request.request.method).toBe('GET');
    request.error(new ErrorEvent('error'));
  });

/*  convertExcelToPdf(filename: string, type: string, file: string): Promise<any> {
    const url = 'https://v2.convertapi.com/' + type + '/to/pdf?Secret=' + this.secret;
  const body = { Parameters: [{ Name: 'File', FileValue: { Name: filename + '.' + type, Data: file } }]};
  return new Promise((resolve, reject) => {
    this.http.post(url, body).toPromise()
      .then(data => {
        resolve(data['Files'][0].FileData);
      })
      .catch(error => {
        reject(error);
      });
  });
}*/

  it('- tetetet', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');
    let type = 'testType';
    let secret = 'sec';
    let filename = 'fn';
    let file = 'file';
    documentService.convertExcelToPdf(filename, type, file).catch(err => {
      console.log(err);
      expect(err).not.toBeNull();
    });
   
    const request = httpMock.expectOne('https://v2.convertapi.com/' + type + '/to/pdf?Secret=' + secret);
    expect(request.request.method).toBe('POST');
    request.flush(type);
  });



});
