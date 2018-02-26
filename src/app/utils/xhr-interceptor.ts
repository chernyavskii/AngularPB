import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,' +
          ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
          ' Access-Control-Request-Headers')
    });
    return next.handle(xhr);
  }
}
