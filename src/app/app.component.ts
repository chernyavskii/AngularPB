import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  options: FormGroup;

  /*constructor(fb: FormBuilder, private authService: AuthService) {
    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });
  }*/

/*
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
*/
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
