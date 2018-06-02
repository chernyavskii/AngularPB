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

  share:string = 'share';
  doc:string = 'document';

  selectedDocument:any = {info: '', documentUrl: Uint8Array, action: this.doc};
  selectedShareDocument:any = {info: '', documentUrl: Uint8Array, action: this.share};

  emptyListOfDocuments = false;
  emptyListOfSharedDocuments = false;


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
        }
        this.dataSource = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        if (err.error.message === 'list of entities are empty') {
          this.emptyListOfDocuments = true;
        }
      });

    this.shareService.getAllSharedDocuments()
      .then(data => {
        this.shareDocuments = data;
        this.listViewShared = false;
        for (let doc of this.shareDocuments) {
          this.showSharedDocumentInPng(doc.id);
        }
        this.dataSourceShared = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        if (err.error.message === 'list of entities are empty') {
          this.emptyListOfSharedDocuments = true;
        }
      });
  }

  ngAfterViewInit():void {
    this.allDocuments = [];
    this.dataSource = null;
    this.shareDocuments = [];
    this.dataSourceShared = null;
    this.documentService.getAllDocuments()
      .then(data => {
        this.allDocuments = data;
        this.dataSource = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        if (err.error.message === 'list of entities are empty') {
          this.emptyListOfDocuments = true;
        }
      });

    this.shareService.getAllSharedDocuments()
      .then(data => {
        this.shareDocuments = data;
        this.dataSourceShared = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        if (err.error.message === 'list of entities are empty') {
          this.emptyListOfSharedDocuments = true;
        }
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

  showSharedDocumentInPng(id:number) {
    this.shareService.showPng(id)
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
    this.selectedShareDocument.info = '';
    this.selectedShareDocument.documentUrl = '';
    this.documentService.showPdf(selectDocument.id)
      .then(res => {
        this.pageurl = res;
        this.selectedDocument.info = selectDocument;
        this.selectedDocument.documentUrl = this.pageurl;
      })
      .catch(err => err.toString());
  }

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyFilterShared(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceShared.filter = filterValue;
  }

  documentShareInfo(selectDocument:any) {
    this.selectedDocument.info = '';
    this.selectedDocument.documentUrl = '';
    this.shareService.showPdf(selectDocument.id)
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
      console.log(result);
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



