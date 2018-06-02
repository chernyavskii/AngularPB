import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Driver} from '../../../models/Driver';
import {MatTableDataSource} from '@angular/material';
import {DriverService} from "../../../services/driver/driver.service";

@Component({
  selector: 'app-admin-drivers',
  templateUrl: './admin-drivers.component.html',
  styleUrls: ['./admin-drivers.component.css']
})
export class AdminDriversComponent implements OnChanges {

  @Input()
  drivers:Driver[] = [];
  selectedDriverForUpdate:Driver;
  selectedDriversForDeleted:Driver[] = [];

  displayedColumns = ['configuration', 'carNumber', 'firstName', 'middleName', 'lastName' /*'more'*/];
  dataSource = null;

  constructor(private driverService:DriverService) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.dataSource = this.drivers;

    this.selectedDriverForUpdate = null;
    this.dataSource = new MatTableDataSource<Driver>(this.drivers);
  }

  updateDriver(driver:Driver) {
    this.selectedDriverForUpdate = null;
    this.selectedDriverForUpdate = driver;
  }

  onVotedDriversAdmin(updateDataArray:any) {
    if (updateDataArray === 'exit') {
      this.selectedDriverForUpdate = null;
    } else {
      const result = this.checkId(updateDataArray.id);
      if (result) {
        this.updateDataSource(updateDataArray.id, updateDataArray);
      }
    }
  }

  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
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

  deleteDriver(element:Driver) {
    this.selectedDriversForDeleted.push(element);
  }

  deleteArray(updateDataArray: any) {
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(updateDataArray[i].id);
      }
    }
    this.selectedDriversForDeleted = [];
    this.selectedDriverForUpdate = null;
    this.dataSource = new MatTableDataSource<Driver>(this.drivers);
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i,1);
      }
    }
  }
}
