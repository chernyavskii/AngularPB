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
  waitProp = false;
  onLoad = false;

  constructor(private documentService: DocumentService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.onLoad = true;
    this.waitProp = true;
    this.documentService.getAllDocuments()
      .then(data => {
        this.allDocuments = data;
        this.documentService.showAllDocumentInPng(this.allDocuments)
          .then(result => {
            for (let doc of this.allDocuments) {
              this.showDocumentInPng(doc.id, doc.name, doc.type);
            }
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
      .then(res => {
        this.url.push('data:image/png;base64,' + res);
        this.waitProp = false;
        this.onLoad = false;

      })
      .catch(err => err.toString());
  }


}



