import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/user.service';
import { CookieService } from 'ng2-cookies';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private cookie: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cookie.get('currentUser')) {
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
