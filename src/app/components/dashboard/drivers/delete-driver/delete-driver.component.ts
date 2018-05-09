import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Driver} from '../../../../models/Driver';
import {DriverService} from '../../../../services/driver/driver.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent implements OnChanges {

  @Input()
  drivers: Driver[] = [];

  @Output() deleteArray = new EventEmitter<any>();
  @Output() deleteArrayAdmin = new EventEmitter<any>();

  constructor(private driverService: DriverService,
              private snackBar: MatSnackBar) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.drivers) {
      this.driverService.deleteAllDrivers(this.drivers)
        .then(data => {
          this.deleteArray.emit(data);
          this.deleteArrayAdmin.emit(data);
          this.snackBar.open('Удаление успешно выполнено', 'Закрыть', {
            duration: 3000
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

}
