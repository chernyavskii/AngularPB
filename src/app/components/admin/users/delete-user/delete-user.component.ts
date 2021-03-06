import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnChanges {

  @Input()
  users:User[] = [];
  @Output() deleteArray = new EventEmitter<any>();

  constructor(private userService:UserService,
              private snackBar:MatSnackBar) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    if (changes.users) {
      this.userService.deleteAllUsers(this.users)
        .then(data => {
          this.deleteArray.emit(data);
          this.snackBar.open('Удаление пользователя успешно выполнено', 'Закрыть', {
            duration: 3000
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }


}
