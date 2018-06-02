import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DocumentService} from "../../../services/document/document.service";
import {ShareService} from "../../../services/share/share.service";
import {MatTableDataSource} from '@angular/material';
import {Document} from "../../../models/Document";

@Component({
  selector: 'app-admin-shared-documents',
  templateUrl: './admin-shared-documents.component.html',
  styleUrls: ['./admin-shared-documents.component.css']
})
export class AdminSharedDocumentsComponent implements OnChanges {

  @Input()
  documents: Document[];
  document:string = 'document';
  selectedShareDocument:any = {info: '', documentUrl: Uint8Array, action: this.document};

  url:any[] = [];
  pageurl:Uint8Array;
  elements:any[];

  waitProp = false;
  onLoad = false;
  listView = false;

  displayedColumns = ['name', 'date', 'more'];

  dataSourceShared = null;

  constructor(private documentService: DocumentService,
              private shareService: ShareService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listView = false;
    for (let doc of this.documents) {
      this.showDocumentInPng(doc.id);
    }
    this.dataSourceShared = new MatTableDataSource<Document>(this.documents);
  }

  showDocumentInPng(id:number) {
    this.documentService.showPng(id)
      .then(res => {
        this.url.push('data:image/png;base64,' + res);
      })
      .catch(err => err.toString());
  }

  documentInfo(selectDocument:any) {
    this.documentService.showPdf(selectDocument.id)
      .then(res => {
        this.pageurl = res;
        this.selectedShareDocument.info = selectDocument;
        this.selectedShareDocument.documentUrl = this.pageurl;
      })
      .catch(err => err.toString());
  }
  deleteElement(event: any) {
    const document:Document[] = [];
    document.push(event);
    for (let i = 0; i < document.length; i++) {
      const result = this.checkId(document[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(document[i].id);
      }
    }
    this.selectedShareDocument = {info: '', documentUrl: ''};
    this.dataSourceShared = new MatTableDataSource<Document>(this.documents);
  }

  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSourceShared.data.length; i++) {
      if (id === this.dataSourceShared.data[i].id) {
        return true;
      }
    }

    return false;
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSourceShared.data.length; i++) {
      if (id === this.dataSourceShared.data[i].id) {
        this.dataSourceShared.data.splice(i, 1);
      }
    }
  }

  applyFilter(filterValue:string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceShared.filter = filterValue;
  }
}
