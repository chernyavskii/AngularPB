import {Component, Input, EventEmitter, AfterViewInit} from '@angular/core';
import {User} from '../../../models/User';
import {Document} from '../../../models/Document';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

import {FormBuilder} from '@angular/forms';
import {DocumentService} from '../../../services/document/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements AfterViewInit{

  @Input()
  user = new User();
  allDocuments: Document[];
  selectedDocument: any = {info: '', documentUrl: Uint8Array};

  url: any[] = [];
  pageurl: Uint8Array;
  elements: any[];

  waitProp = false;
  onLoad = false;
  listView = false;

  displayedColumns = ['name', 'date', 'more'];

  dataSource = null;
  selection = new SelectionModel<Document>(true, []);

  constructor(private documentService: DocumentService,
              private fb: FormBuilder) {
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
  }

  ngAfterViewInit(): void {
    this.documentService.getAllDocuments()
      .then(data => {
        this.allDocuments = data;
        this.dataSource = new MatTableDataSource<Document>(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  showDocumentInPng(id: number) {
    this.documentService.showPng(id)
      .then(res => {
        this.url.push('data:image/png;base64,' + res);
        this.waitProp = false;
      })
      .catch(err => err.toString());
    this.onLoad = false;
  }

  showDocumentInPdf(id: number) {
    this.documentService.showPdf(id)
      .then(res => {
        this.pageurl = res;
      })
      .catch(err => err.toString());
  }

  documentInfo(selectDocument: any) {
    this.documentService.showPdf(selectDocument.id)
      .then(res => {
        this.pageurl = res;
        this.selectedDocument.info = selectDocument;
        this.selectedDocument.documentUrl = this.pageurl;
      })
      .catch(err => err.toString());
  }

  deleteElement(event: any) {
    const document: Document[] = [];
    document.push(event);
    console.log(document);
    for (let i = 0; i < document.length; i++) {
      const result = this.checkId(document[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(document[i].id);
      }
    }
    this.selectedDocument = {info: '', documentUrl: ''};
  }

  updateDataSourceAfterDeleted(id: number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i);
      }
    }
    this.ngAfterViewInit();
  }

  checkId(id: number): boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  changeView() {
    this.listView ? this.listView = false : this.listView = true;
  }
}



