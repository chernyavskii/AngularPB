import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Driver} from '../../../../models/Driver';
import {DriverService} from '../../../../services/driver/driver.service';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent implements OnChanges {

  @Input()
  drivers: Driver[] = [];
  @Output() deleteArray = new EventEmitter<any>();

  constructor(private driverService: DriverService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.drivers) {
      this.driverService.deleteAllDrivers(this.drivers)
        .then(data => {
          this.deleteArray.emit(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

}
