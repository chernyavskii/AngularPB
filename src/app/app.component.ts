import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {/*implements OnInit*/

  static API_URL = 'http://localhost:8081';


 /* constructor(private authService: AuthService, private router: Router, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
  }

  qqwerty() {
    console.log("QQQ");
    this.userService.testFindAll();
  }
  authenticated() {
    return this.authService.getAuth();
  }


  logout() {
/!*    this.cookie.delete('currentUser');
    this.router.navigateByUrl('');*!/
  }*/
}
