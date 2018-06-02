import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from '../../../../models/Document';
import {DocumentService} from '../../../../services/document/document.service';
import {ShareService} from "../../../../services/share/share.service";
import {DialogDocumentsComponent} from "../dialog-documents/dialog-documents.component";
import {MatSnackBar, MatDialog} from '@angular/material';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  @Input()
  document:any;
  @Output() deleteElement = new EventEmitter<Document>();
  @Output() deleteShareElement = new EventEmitter<Document>();

  onLoad = false;

  constructor(private documentService:DocumentService,
              private shareService:ShareService,
              public dialog:MatDialog) {
  }

  ngOnInit() {
  }

  printDocument() {
    this.onLoad = true;
    this.documentService.printDocument(this.document.info.id)
      .then(data => {
        if (data) {
          this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  printSharedDocument() {
    this.onLoad = true;
    this.shareService.printDocument(this.document.info.id)
      .then(data => {
        if (data) {
          this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteDocument() {
    if (this.document.action === 'share') {
      const dialogRef = this.dialog.open(DialogDocumentsComponent, {
        data: {share: true}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.shareService.deleteSharedDocument(this.document.info.id)
            .then(data => {
              if (data) {
                const dropDocument:Document = this.document.info;
                this.deleteShareElement.emit(dropDocument);
                this.onLoad = false;
                this.document.info = '';
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }

    if (this.document.action === 'document') {
      const dialogRef = this.dialog.open(DialogDocumentsComponent, {
        data: {document: true}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.documentService.deleteDocument(this.document.info.id)
            .then(data => {
              if (data) {
                const dropDocument:Document = this.document.info;
                this.deleteElement.emit(dropDocument);
                this.onLoad = false;
                this.document.info = '';
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }

  downloadDocumentInPdf() {
    this.onLoad = true;
    this.documentService.downloadPDF(this.document.info.id, this.document.info.name)
      .then(data => {
        if (data) {
          this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  downloadSharedDocumentInPdf() {
    this.onLoad = true;
    this.shareService.downloadPDF(this.document.info.id, this.document.info.name)
      .then(data => {
        if (data) {
          this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  downloadDocumentInExcel() {
    this.onLoad = true;
    this.documentService.downloadExcel(this.document.info.id, this.document.info.name, this.document.info.type)
      .then(data => {
        if (data) {
          this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  downloadSharedDocumentInExcel() {
    this.onLoad = true;
    this.shareService.downloadExcel(this.document.info.id, this.document.info.name, this.document.info.type)
      .then(data => {
        if (data) {
          this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  closeWindow() {
    this.document.info = '';
  }

}
