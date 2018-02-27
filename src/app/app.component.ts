import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) {
/*
    this.authService.getAuth();
*/
  }

  ngOnInit() {
  }

  authenticated() {
    return this.authService.getAuth();
  }


  logout() {
/*    this.cookie.delete('currentUser');
    this.router.navigateByUrl('');*/
  }
}
