import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent {

  
  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  createdItem(item: any){
    this.dialogRef.close(item);
  }

  successButton() {
    this.dialogRef.close(true);
  }
}
