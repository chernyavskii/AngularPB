import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Driver} from "../../../../models/Driver";
import {DriverService} from "../../../../services/driver/driver.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogDriverComponent} from "../../../dashboard/drivers/dialog-driver/dialog-driver.component";
import {MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-drivers-update',
  templateUrl: './admin-drivers-update.component.html',
  styleUrls: ['./admin-drivers-update.component.css']
})
export class AdminDriversUpdateComponent implements OnChanges {

  @Input()
  driver:Driver;
  @Output() onVotedDriversAdmin = new EventEmitter<any>();
  updateDriverForm:FormGroup;

  constructor(private driverService:DriverService,
              private _formBuilder:FormBuilder,
              public dialog:MatDialog,
              private snackBar:MatSnackBar) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    if (this.driver) {
      this.updateDriverForm = this._formBuilder.group({
        firstName: [this.driver.firstName, Validators.required],
        middleName: [this.driver.middleName, Validators.required],
        lastName: [this.driver.lastName, Validators.required],
        carModel: [this.driver.carModel, Validators.required],
        carNumber: [this.driver.carNumber, Validators.required],
        trailerModel: [this.driver.trailerModel, Validators.required],
        trailerNumber: [this.driver.trailerNumber, Validators.required]
      });
    }
  }

  updateDriver(formValue:FormGroup) {
    const dialogRef = this.dialog.open(DialogDriverComponent, {
      data: {updateDriver: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateDriver:Driver = {
          id: null,
          firstName: this.updateDriverForm.value.firstName,
          middleName: this.updateDriverForm.value.middleName,
          lastName: this.updateDriverForm.value.lastName,
          carModel: this.updateDriverForm.value.carModel,
          carNumber: this.updateDriverForm.value.carNumber,
          trailerModel: this.updateDriverForm.value.trailerModel,
          trailerNumber: this.updateDriverForm.value.trailerNumber
        };
        this.driverService.updateDriver(this.driver.id, updateDriver)
          .then(data => {
            this.onVotedDriversAdmin.emit(data);
            /*
             this.onLoad = false;
             */
            this.snackBar.open('Обновление водителя успешно выполнено', 'Закрыть', {
              duration: 3000
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  closeWindow() {
    this.onVotedDriversAdmin.emit('exit');
  }

}
