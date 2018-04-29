import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-agent',
  templateUrl: './dialog-agent.component.html',
  styleUrls: ['./dialog-agent.component.css']
})
export class DialogAgentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {console.log(data);}

}
