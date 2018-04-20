import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DocumentService} from '../../../../services/document/document.service';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.css']
})
export class DeleteDocumentComponent implements OnChanges {
  @Input()
  documents: Document[] = [];

  @Output() deleteArray = new EventEmitter<any>();

  constructor(private documentService: DocumentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.documents) {
      this.documentService.deleteAllDocuments(this.documents)
        .then(data => {
          this.deleteArray.emit(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

}
