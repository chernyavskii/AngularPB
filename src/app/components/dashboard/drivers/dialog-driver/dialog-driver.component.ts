import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-driver',
  templateUrl: './dialog-driver.component.html',
  styleUrls: ['./dialog-driver.component.css']
})
export class DialogDriverComponent {

  constructor(public dialogRef: MatDialogRef<DialogDriverComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  successButton() {
    this.dialogRef.close(true);
  }

}
