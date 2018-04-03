import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Document} from '../../../models/Document';
import {Product} from '../../../models/Product';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DocumentService} from '../../../services/document/document.service';
import {AgentService} from '../../../services/agent/agent.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  @Input()
  user = new User();
  allDocuments: Document[];

  url: any[] = [];

  constructor(private documentService: DocumentService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.documentService.getAllDocuments()
      .then(data => {
        this.allDocuments = data;
        this.documentService.showAllDocumentInPng(this.allDocuments)
          .then(result => {
            for (let doc of this.allDocuments) {
              this.showDocumentInPng(doc.id, doc.name, doc.type);
            }
        /*    this.url = 'data:image/png;base64,' + result;
            this.url = result;*/
       /* let Uint: Uint8Array;

            this.url = result;
            for (let i = 0; i < this.url.length; i++) {
              let aa = <Uint8Array>this.url[i];
              this.url[i] = 'data:image/png;base64,' + aa;

            }*/
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showDocumentInPng(id: number, filename: string, type: string) {
    this.documentService.showDocumentInPng(id, filename, type)
      .then(res => { this.url.push('data:image/png;base64,' + res); })
      .catch(err => err.toString());
  }


}
