import {Component, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {tableLabels} from '../../../data/data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  allUsers: User[];
  displayedColumns = ['select', 'username', 'firstName', 'lastName', 'middleName', 'unp', 'organization', 'position', 'address', 'rs', 'ks', 'bank', 'bik', 'phone'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = null;
  selection = new SelectionModel<User>(true, []);

  loadData = false;
  allSelect = false;

  constructor(private userService: UserService) {
    this.loadData = true;
    this.userService.getAllUsers()
      .then(result => {
        this.allUsers = result;
        for (let i = 0; i < tableLabels.length; i++) {
          this.paginator._intl.firstPageLabel = tableLabels[0].name;
          this.paginator._intl.lastPageLabel = tableLabels[1].name;
          this.paginator._intl.previousPageLabel = tableLabels[2].name;
          this.paginator._intl.nextPageLabel = tableLabels[3].name;
          this.paginator._intl.itemsPerPageLabel = tableLabels[4].name;
        }
        this.dataSource = new MatTableDataSource<User>(result);
        this.dataSource.paginator = this.paginator;
        this.loadData = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.allSelect = true;
      });
  }

  isSelect(raw: any) {
    this.selection.toggle(raw);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

}
