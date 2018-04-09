import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/User';
import {Document} from '../../../models/Document';

import {FormBuilder} from '@angular/forms';
import {DocumentService} from '../../../services/document/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {


  @Input()
  user = new User();
  allDocuments: Document[];
  selectedDocument: any = {info: '', documentUrl: Uint8Array};

  url: any[] = [];
  pageurl: Uint8Array;
  elements: any[];

  waitProp = false;
  onLoad = false;

  constructor(private documentService: DocumentService,
              private fb: FormBuilder) {
    this.onLoad = true;
    this.waitProp = true;
    this.documentService.getAllDocuments()
      .then(data => {
        this.allDocuments = data;
        for (let doc of this.allDocuments) {
          this.showDocumentInPng(doc.id);
          this.elements = this.allDocuments.concat(this.url);
        }
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
    for (let i = 0; i < this.allDocuments.length; i++) {
      if (this.allDocuments[i].id == event.id) {
        this.allDocuments.splice(i, 1);
      }
    }
  }
}



