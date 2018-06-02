import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Document} from '../../../models/Document';
import {MatTableDataSource} from '@angular/material';
import {Agent} from '../../../models/Agent';
import {DocumentService} from '../../../services/document/document.service';
import {ShareService} from "../../../services/share/share.service";

@Component({
  selector: 'app-admin-documents',
  templateUrl: './admin-documents.component.html',
  styleUrls: ['./admin-documents.component.css']
})
export class AdminDocumentsComponent implements OnChanges {
  @Input()
  documents:Document[];
  share:string = 'share';
  doc:string = 'document';
  selectedDocument:any = {info: '', documentUrl: Uint8Array, action: this.doc};

  url:any[] = [];
  pageurl:Uint8Array;
  elements:any[];

  waitProp = false;
  onLoad = false;
  listView = false;

  displayedColumns = ['name', 'date', 'more'];

  dataSource = null;

  constructor(private documentService:DocumentService,
              private shareService:ShareService) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.listView = false;
    for (let doc of this.documents) {
      this.showDocumentInPng(doc.id);
    }
    this.dataSource = new MatTableDataSource<Document>(this.documents);
  }

  showDocumentInPng(id:number) {
    this.documentService.showPng(id)
      .then(res => {
        console.log(res);
        this.url.push('data:image/png;base64,' + res);
        this.waitProp = false;
      })
      .catch(err => err.toString());
    this.onLoad = false;
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
    this.dataSource = new MatTableDataSource<Document>(this.documents);
  }

  
  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }

    return false;
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i, 1);
      }
    }
  }

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
