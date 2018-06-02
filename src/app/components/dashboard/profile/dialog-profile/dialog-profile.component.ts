import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.css']
})
export class DialogProfileComponent {

  constructor(public dialogRef: MatDialogRef<DialogProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  successButton() {
    this.dialogRef.close(true);
  }

}
