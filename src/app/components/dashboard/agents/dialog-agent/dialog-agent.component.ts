import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-agent',
  templateUrl: './dialog-agent.component.html',
  styleUrls: ['./dialog-agent.component.css']
})
export class DialogAgentComponent {

  constructor(public dialogRef: MatDialogRef<DialogAgentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  successButton() {
    this.dialogRef.close(true);
  }

}
