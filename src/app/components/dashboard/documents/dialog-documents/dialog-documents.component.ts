import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-documents',
  templateUrl: './dialog-documents.component.html',
  styleUrls: ['./dialog-documents.component.css']
})
export class DialogDocumentsComponent {

  constructor(public dialogRef: MatDialogRef<DialogDocumentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  successButton() {
    this.dialogRef.close(true);
  }

}
