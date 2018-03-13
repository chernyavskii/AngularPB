import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/User';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input()
  user = new User();

  constructor() { }

  ngOnInit() {
  }

}
