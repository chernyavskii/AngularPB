import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Driver} from '../../../../models/Driver';
import {DriverService} from '../../../../services/driver/driver.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  addNewDriverGroup: FormGroup;

  @Output() newItem = new EventEmitter<Driver[]>();
  @Output() newDriverFromDocuments = new EventEmitter<Driver[]>();
  @Input()
  createnewprop: any;

  @Input()
  newDriverProp: any;

  constructor(private driverService: DriverService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.addNewDriverGroup = this.fb.group({
      id: ['', Validators.nullValidator],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      carModel: ['', Validators.required],
      carNumber: ['', Validators.required],
      trailerModel: ['', Validators.required],
      trailerNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addNewDriver() {
    if (this.addNewDriverGroup.status !== 'INVALID') {
      const newDriver: Driver = {
        id: null,
        firstName: this.addNewDriverGroup.value.firstName,
        middleName: this.addNewDriverGroup.value.middleName,
        lastName: this.addNewDriverGroup.value.lastName,
        carModel: this.addNewDriverGroup.value.carModel,
        carNumber: this.addNewDriverGroup.value.carNumber,
        trailerModel: this.addNewDriverGroup.value.trailerModel,
        trailerNumber: this.addNewDriverGroup.value.trailerNumber
      };
      this.driverService.addDriver(newDriver)
        .then(data => {
          if (data) {
            this.newItem.emit(data);
            this.newDriverFromDocuments.emit(data);
            this.snackBar.open('Новый водитель успешно добавлен', 'Закрыть', {
              duration: 3000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  closeWindow() {
    this.createnewprop = false;
    this.newDriverProp = false;
    this.newItem.emit(this.createnewprop);
    this.newDriverFromDocuments.emit(this.newDriverProp);
  }

}
