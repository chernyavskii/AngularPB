import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Document} from '../../../models/Document';
import {MatTableDataSource} from '@angular/material';
import {Agent} from '../../../models/Agent';
import {DocumentService} from '../../../services/document/document.service';

@Component({
  selector: 'app-admin-documents',
  templateUrl: './admin-documents.component.html',
  styleUrls: ['./admin-documents.component.css']
})
export class AdminDocumentsComponent implements OnChanges {

  @Input()
  users: any[] = [];

  displayedColumns = ['select', 'name', 'date'];

  dataSource: any[] = [];
  selections: any[] = [];
  selection = new SelectionModel<Document>(true, []);

  allSelect = false;

  /*
    selectedDocumentsForUpdate: Document[] = [];
  */
  selectedDocumentsForDownload: Document[] = [];
  selectedDocumentsForDeleted: Document[] = [];

  constructor(private documentService: DocumentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users.firstChange) {
      for (let i = 0; i < this.users.length; i++) {
        this.selections.push(new SelectionModel<Document>(true, []));
        this.dataSource.push(new MatTableDataSource<Document>(this.users[i].documents));
      }
    } else {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource.splice(i);
        this.selections.splice(i);
      }
      for (let i = 0; i < this.users.length; i++) {
        this.selections.push(new SelectionModel<Document>(true, []));
        this.dataSource.push(new MatTableDataSource<Document>(this.users[i].documents));
      }
    }
  }

  isSelect(raw: any, index: number) {
    this.selections[index].toggle(raw);
  }

  isAllSelected(index: number, choiceDS: MatTableDataSource<Document>) {
    const numSelected = this.selections[index].selected.length;
    const numRows = choiceDS.data.length;

    return numSelected === numRows;
  }

  masterToggle(index: number, choiceDS: MatTableDataSource<Document>) {
    this.isAllSelected(index, choiceDS) ?
      this.selections[index].clear() :
      choiceDS.data.forEach(row => {
        this.selections[index].select(row);
        this.allSelect = true;
      });
  }

  /*editElements() {
    const arrayDocuments: Document[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayDocuments.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedDocumentsForUpdate = arrayDocuments;
  }*/


  deleteElements() {
    const arrayDocuments: Document[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayDocuments.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedDocumentsForDeleted = arrayDocuments;
  }

  checkId(id: number): boolean {
    for (let i = 0; i < this.dataSource.length; i++) {
      for (let k = 0; k < this.dataSource[i].data.length; k++) {
        if (id === this.dataSource[i].data[k].id) {
          return true;
        }
      }
    }
    return false;
  }

  checkEquals(arr: Document[], id) {
    for (let i = 0; i < arr.length; i++) {
      if (id == arr[i].id) {
        return true;
      }
    }
    return false;
  }

  /*onVotedDocumentsAdmin(updateDataArray: Document[]) {
    if (updateDataArray.length === 0) {
      for (let i = 0; i < this.selectedDocumentsForUpdate.length; i++) {
        this.selectedDocumentsForUpdate.splice(i);
      }
    }
    this.selections.forEach(select => {
      select.selected.forEach(sel => {
        const result = this.checkEquals(updateDataArray, sel.id);
        if (!result) {
          select.deselect(sel);
        }
      });
    });

    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSource(updateDataArray[i].id, updateDataArray[i]);
      }
    }
  }*/

  updateDataSource(id: number, data: Document) {
    this.dataSource.forEach(result => {
      result.data.forEach(raw => {
        if (id === raw.id) {
          raw.name = data.name;
          raw.type = data.type;
          raw.date = data.date;
        }
      });
    });
  }

  deleteArray(updateDataArray: any) {
    /*for (let i = 0; i < this.selectedDocumentsForUpdate.length; i++) {
      updateDataArray.forEach(updated => {
        if (updated.id == this.selectedDocumentsForUpdate[i].id) {
          this.selectedDocumentsForUpdate.splice(i, 1);
        }
      });
    }*/
    /* выше код работает, выделенные к редактированию не удаляются, а остаются, но нету селекта после удаления других */
    /*Выше код тестинруется, когда выбрал несколько агентов - нажал редактировать - а потом удалить, они должны тоже удалиться*/

    for (let i = 0; i < updateDataArray.length; i++) {
      for (let j = 0; j < this.dataSource.length; j++) {
        for (let k = 0; k < this.dataSource[j].data.length; k++) {
          if (this.dataSource[j].data[k].id === updateDataArray[i].id) {
            this.dataSource[j].data.splice(k, 1);
          }
        }
      }
    }
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource.splice(i);
      this.selections.splice(i);
    }
    for (let i = 0; i < this.users.length; i++) {
      this.selections.push(new SelectionModel<Document>(true, []));
      this.dataSource.push(new MatTableDataSource<Document>(this.users[i].documents));
    }
  }

  downloadDocumentInPdf() {
    const arrayDocuments: Document[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayDocuments.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedDocumentsForDownload = arrayDocuments;
    this.documentService.downloadAllDocumentsPDF(this.selectedDocumentsForDownload)
      .then(data => {
        if (data) {
          console.log('run!');
          //this.onLoad = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  downloadDocumentInExcel() {
    const arrayDocuments: Document[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayDocuments.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedDocumentsForDownload = arrayDocuments;

    this.documentService.downloadAllDocumentsExcel(this.selectedDocumentsForDownload)
      .then(data => {
        if (data) {
          console.log('run! exc');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}
