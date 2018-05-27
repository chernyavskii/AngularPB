import {Component, Input, EventEmitter, AfterViewInit} from '@angular/core';
import {User} from '../../../models/User';
import {Document} from '../../../models/Document';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

import {FormBuilder} from '@angular/forms';
import {DocumentService} from '../../../services/document/document.service';
import {ShareService} from "../../../services/share/share.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements AfterViewInit {
  @Input()
  user = new User();
  allDocuments:Document[] = [];
  shareDocuments:Document[] = [];
  share: string = 'share';
  doc: string = 'document';
  selectedDocument:any = {info: '', documentUrl: Uint8Array, action: this.doc};
  selectedShareDocument:any = {info: '', documentUrl: Uint8Array, action: this.share};


  url:any[] = [];
  pageurl:Uint8Array;
  elements:any[];

  waitProp = false;
  onLoad = false;
  listView = false;
  listViewShared = false;

  displayedColumns = ['name', 'date', 'more'];

  dataSource = null;
  dataSourceShared = null;

  selection = new SelectionModel<Document>(true, []);

  constructor(private documentService:DocumentService,
              private fb:FormBuilder,
              private shareService:ShareService) {
    this.onLoad = true;
    this.waitProp = true;
    this.documentService.getAllDocuments()
      .then(data => {
        this.allDocuments = data;
        this.listView = false;
        for (let doc of this.allDocuments) {
          this.showDocumentInPng(doc.id);
          this.elements = this.allDocuments.concat(this.url);
        }
        this.dataSource = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        console.log(err);
      });

    this.shareService.getAllSharedDocuments()
      .then(data => {
        this.shareDocuments = data;
        this.listViewShared = false;
        for (let doc of this.shareDocuments) {
          this.showDocumentInPng(doc.id);
          //this.elements = this.allDocuments.concat(this.url);
        }
        this.dataSourceShared = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngAfterViewInit():void {
    this.allDocuments = [];
    this.dataSource = null;
    this.shareDocuments = [];
    this.dataSourceShared = null;
    this.documentService.getAllDocuments()
      .then(data => {
        console.log(data);
        console.log('all');
        this.allDocuments = data;
        this.dataSource = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        console.log(err);
      });


    this.shareService.getAllSharedDocuments()
      .then(data => {
        console.log(data);
        console.log('all');
        this.shareDocuments = data;
        this.dataSourceShared = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  showDocumentInPng(id:number) {
    this.documentService.showPng(id)
      .then(res => {
        this.url.push('data:image/png;base64,' + res);
        this.waitProp = false;
      })
      .catch(err => err.toString());
    this.onLoad = false;
  }

  showDocumentInPdf(id:number) {
    this.documentService.showPdf(id)
      .then(res => {
        this.pageurl = res;
      })
      .catch(err => err.toString());
  }

  documentInfo(selectDocument:any) {
    this.documentService.showPdf(selectDocument.id)
      .then(res => {
        this.pageurl = res;
        this.selectedDocument.info = selectDocument;
        this.selectedDocument.documentUrl = this.pageurl;
      })
      .catch(err => err.toString());
  }

  documentShareInfo(selectDocument:any) {
    this.documentService.showPdf(selectDocument.id)
      .then(res => {
        this.pageurl = res;
        this.selectedShareDocument.info = selectDocument;
        this.selectedShareDocument.documentUrl = this.pageurl;
      })
      .catch(err => err.toString());
  }

  deleteShareElement(event:any) {
    const document:Document[] = [];
    document.push(event);
    for (let i = 0; i < document.length; i++) {
      const result = this.checkShareId(document[i].id);
      if (result) {
        this.updateShareDataSourceAfterDeleted(document[i].id);
      }
    }
    this.selectedShareDocument = {info: '', documentUrl: ''};
  }

  deleteElement(event:any) {
    const document:Document[] = [];
    document.push(event);
    for (let i = 0; i < document.length; i++) {
      const result = this.checkId(document[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(document[i].id);
      }
    }
    this.selectedDocument = {info: '', documentUrl: ''};
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i);
      }
    }

    this.ngAfterViewInit();
  }

  updateShareDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSourceShared.data.length; i++) {
      if (id === this.dataSourceShared.data[i].id) {
        this.dataSourceShared.data.splice(i);
      }
    }

    this.ngAfterViewInit();
  }

  checkShareId(id:number):boolean {
    for (let i = 0; i < this.dataSourceShared.data.length; i++) {
      if (id === this.dataSourceShared.data[i].id) {
        return true;
      }
    }

    return false;
  }

  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }

    return false;
  }
}



