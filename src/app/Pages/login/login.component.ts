import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { userBodyLogin } from 'src/app/Models/userBodyLogin';
import { userGlobalStored } from 'src/app/Models/userGlobalStored';
import { FlashService } from 'src/app/Services/flash.service';
import { UserSignInServiceService } from 'src/app/Services/Users/user-sign-in-service.service';
import { addUserToGlobalStorageAfterLogin } from 'src/app/State/accion/user.accion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  inputType: string = 'password';
  userBody: userBodyLogin = {
    username: this.email,
    password: this.password,
  };

  constructor(
    private route: Router,
    private userSignInService: UserSignInServiceService,
    private cookieService: CookieService,
    private store: Store,
    private flash: FlashService
  ) {}

  ngOnInit(): void {}

  handleChangeInputPasswordType(type: string): void {
    this.inputType = type;
  }
  async login() {
    this.userBody.password = this.password;
    this.userBody.username = this.email;

    this.userSignInService.userLogin(this.userBody).subscribe(
      (data) => {
        this.cookieService.delete('token');
        this.cookieService.set('token', data.token, 1 / 24);
        var user: userGlobalStored = data.user;
        localStorage.setItem('user', JSON.stringify(user));
        this.store.dispatch(addUserToGlobalStorageAfterLogin({ user }));
        this.route.navigate(['Home/Dashboard']);
      },
      (error) => {
        this.flash.error('Wrong Credentials', 'User');
      }
    );
  }
}
