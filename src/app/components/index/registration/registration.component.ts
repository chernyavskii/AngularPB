import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  registration() {
    this.userService.registration(this.user)
      .then(res => {
        let test = this.router.navigateByUrl('login');
        console.log(test);

      })
      .catch(err => { console.log(err); });
  }
}
