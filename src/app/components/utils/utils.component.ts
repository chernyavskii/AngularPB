import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent {

  constructor(public dialogRef: MatDialogRef<UtilsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  successButton() {
    this.dialogRef.close(true);
  }
}
