import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FlashService } from '../Services/flash.service';

@Injectable({
  providedIn: 'root',
})
export class RouterProtectorByCookieGuard implements CanActivate {
  constructor(
    private cookie: CookieService,
    private router: Router,
    private flash: FlashService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cookie = this.cookie.check('token');

    if (!cookie) {
      this.router.navigate(['login']);
      this.flash.warning('You are not allowed to access this page', 'Sistem');
    }
    return true;
  }
}
