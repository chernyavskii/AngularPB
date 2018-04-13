import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Driver} from '../../../../models/Driver';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DriverService} from '../../../../services/driver/driver.service';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent implements OnChanges {

  @Input()
  drivers: Driver[] = [];
  @Output() onVoted = new EventEmitter<Driver[]>();

  updateDriverForm: FormGroup;
  onLoad = false;
  changes: SimpleChanges;

  constructor(private fb: FormBuilder,
              private driverService: DriverService) {
    this.updateDriverForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  pushItem() {
    for (let i = 0; i < this.drivers.length; i++) {
      this.items.push(this.fb.group({
        id: this.drivers[i].id,
        firstName: this.drivers[i].firstName,
        middleName: this.drivers[i].middleName,
        lastName: this.drivers[i].lastName,
        carModel: this.drivers[i].carModel,
        carNumber: this.drivers[i].carNumber,
        trailerModel: this.drivers[i].trailerModel,
        trailerNumber: this.drivers[i].trailerNumber
      }));
    }
  }

  checkIdCurrent(id: number): boolean {
    for (let i = 0; i < this.changes.drivers.previousValue.length; i++) {
      if (id === this.changes.drivers.previousValue[i].id) {
        return true;
      }
    }
    return false;
  }

  checkIdPrevious(id: number): boolean {
    for (let i = 0; i < this.changes.drivers.currentValue.length; i++) {
      if (id === this.changes.drivers.currentValue[i].id) {
        return true;
      }
    }
    return false;
  }

  removeItem(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      if (this.changes.drivers.currentValue[i].id !== array.at(i).value.id) {
        array.removeAt(i);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changes = changes;
    if (changes.drivers.firstChange) {
      this.pushItem();
    } else {
      if (changes.drivers.currentValue.length > changes.drivers.previousValue.length) {
        for (let i = 0; i < changes.drivers.currentValue.length; i++) {
          const result = this.checkIdCurrent(changes.drivers.currentValue[i].id);
          if (!result) {
            this.removeItem(this.items);
            this.items.push(this.fb.group({
              id: changes.drivers.currentValue[i].id,
              firstName: changes.drivers.currentValue[i].firstName,
              middleName: changes.drivers.currentValue[i].middleName,
              lastName: changes.drivers.currentValue[i].lastName,
              carModel: changes.drivers.currentValue[i].carModel,
              carNumber: changes.drivers.currentValue[i].carNumber,
              trailerModel: changes.drivers.currentValue[i].trailerModel,
              trailerNumber: changes.drivers.currentValue[i].trailerNumber
            }));
          } else {
            this.removeItem(this.items);
            this.items.push(this.fb.group({
              id: changes.drivers.currentValue[i].id,
              firstName: changes.drivers.currentValue[i].firstName,
              middleName: changes.drivers.currentValue[i].middleName,
              lastName: changes.drivers.currentValue[i].lastName,
              carModel: changes.drivers.currentValue[i].carModel,
              carNumber: changes.drivers.currentValue[i].carNumber,
              trailerModel: changes.drivers.currentValue[i].trailerModel,
              trailerNumber: changes.drivers.currentValue[i].trailerNumber
            }));
          }
        }
      } else {
        for (let i = 0; i < changes.drivers.previousValue.length; i++) {
          const result = this.checkIdPrevious(changes.drivers.previousValue[i].id);
          if (!result) {
            for (let k = 0; k < this.items.length; k++) {
              if (this.items.at(k).value.id === changes.drivers.previousValue[i].id) {
                this.items.removeAt(k);
              }
            }
          } else {
            for (let k = 0; k < this.items.length; k++) {
              if (this.items.at(k).value.id === changes.drivers.previousValue[i].id) {
                this.items.removeAt(k);
              }
            }
          }
        }
        this.pushItem();
      }
    }
  }

  get items(): FormArray {
    return this.updateDriverForm.get('items') as FormArray;
  }

  updateDriver(formValue: FormGroup) {
    this.onLoad = true;
    const updateDriver: Driver = {
      id: null,
      firstName: formValue.value.firstName,
      middleName: formValue.value.middleName,
      lastName: formValue.value.lastName,
      carModel: formValue.value.carModel,
      carNumber: formValue.value.carNumber,
      trailerModel: formValue.value.trailerModel,
      trailerNumber: formValue.value.trailerNumber
    };
    this.driverService.updateDriver(formValue.value.id, updateDriver)
      .then(data => {
        //const array: Driver[] = [formValue.value];
        //this.onVoted.emit(array);
        this.onVoted.emit(this.items.value);
        this.onLoad = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateAllDrivers() {
    this.onLoad = true;
    this.driverService.updateAllDrivers(this.items.value)
      .then(data => {
        this.onVoted.emit(this.items.value);
        this.onLoad = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  closeWindow(i: number) {
    this.items.removeAt(i);
    this.onVoted.emit(this.items.value);
  }

}
