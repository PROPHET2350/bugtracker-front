import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookie.get('token');
    const reqClone = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token),
    });
    return next.handle(reqClone);
  }
}
