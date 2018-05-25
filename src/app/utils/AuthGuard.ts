import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Cookie} from 'ng2-cookies';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router) {
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser') && Cookie.get('token')) {
      return true;
    }
    this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
