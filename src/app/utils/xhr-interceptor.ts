import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {Injectable} from '@angular/core';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  credentials: {username: '', password: ''};
  userTest = new User();
  constructor(private authService: AuthService,
              private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,' +
          ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
          ' Access-Control-Request-Headers')
        .set('Authorization', 'Basic SUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUE6SUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUE=')
        // .set('Authorization', 'Basic' + btoa(this.authService.getUsername() + ':' + this.authService.getPassword()))
    });
    return next.handle(xhr);
  }
}
