import {AfterViewInit, Component, Input} from '@angular/core';
import {User} from '../../../models/User';
import {Driver} from '../../../models/Driver';
import {DriverService} from '../../../services/driver/driver.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Error} from '../../../models/Error';
import {MatTableDataSource, MatDialog} from '@angular/material';
import {DialogDriverComponent} from '../drivers/dialog-driver/dialog-driver.component'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements AfterViewInit {


  displayedColumns = ['select', 'carNumber', 'firstName', 'middleName', 'lastName', 'more'];

  @Input()
  user = new User();
  allDrivers:Driver[];
  selectedDrivers:Driver[];
  selectedDriversForDeleted:Driver[];
  error = new Error('','',0);

  loadData = false;
  allSelect = false;

  dataSource = null;
  selection = new SelectionModel<Driver>(true, []);

  createnewprop = false;
  errorProp = false;

  constructor(private driverService:DriverService,
              public dialog:MatDialog) {
    this.loadData = true;

    this.driverService.getAllDrivers()
      .then(data => {
        if (data) {
          this.loadData = false;
          this.allDrivers = data;
          this.dataSource = new MatTableDataSource<Driver>(data);
        }
      })
      .catch(err => {
        this.loadData = false;
        this.errorProp = true;
        this.error.code = err.error.code;
        this.error.message = err.error.message;
        this.error.status = err.error.status;
        console.log(err);
      });
  }

  ngAfterViewInit():void {
    this.driverService.getAllDrivers()
      .then(data => {
        if (data) {
          this.allDrivers = data;
          this.dataSource = new MatTableDataSource<Driver>(data);
        }
      })
      .catch(err => {
        this.loadData = false;
        this.errorProp = true;
        this.error.code = err.error.code;
        this.error.message = err.error.message;
        this.error.status = err.error.status;
      });
  }

  applyFilter(filterValue:string) {
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

  isSelect(raw:any) {
    this.selection.toggle(raw);
  }

  editElements() {
    this.selectedDrivers = this.selection.selected;
  }

  deleteElements() {
    const dialogRef = this.dialog.open(DialogDriverComponent, {
      data: {agentsDeleted: this.selection.selected}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.selectedDriversForDeleted = this.selection.selected;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  onVoted(updateDataArray:any) {
    this.selection.clear();
    for (let i = 0; i < updateDataArray.length; i++) {
      this.dataSource.data.forEach(row => {
        if (row.id == updateDataArray[i].id) {
          this.selection.select(row);
        }
      });
    }

    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSource(updateDataArray[i].id, updateDataArray[i]);
      }
    }
  }

  newItem(event:any) {
    const result = typeof event;
    if (result == 'boolean') {
      this.createnewprop = false;
    } else {
      this.allDrivers.push(event);
      this.dataSource = new MatTableDataSource<Driver>(this.allDrivers);
    }
  }

  deleteArray(updateDataArray:any) {
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(updateDataArray[i].id);
      }
    }
    this.selectedDrivers = null;
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i);
      }
    }
    this.selection.clear();
    this.ngAfterViewInit();
  }

  updateDataSource(id:number, data:Driver) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data[i].firstName = data.firstName;
        this.dataSource.data[i].middleName = data.middleName;
        this.dataSource.data[i].lastName = data.lastName;
        this.dataSource.data[i].carModel = data.carModel;
        this.dataSource.data[i].carNumber = data.carNumber;
        this.dataSource.data[i].trailerModel = data.trailerModel;
        this.dataSource.data[i].trailerNumber = data.trailerNumber;
      }
    }
  }

  createNew() {
    this.createnewprop = true;
  }

  driverInfo(element: Driver) {
    const dialogRef = this.dialog.open(DialogDriverComponent, {
      data: {info: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
