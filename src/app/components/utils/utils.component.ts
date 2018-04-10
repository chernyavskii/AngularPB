import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
