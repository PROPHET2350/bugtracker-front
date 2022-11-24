import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userBodyLogin } from 'src/app/Models/userBodyLogin';
import { userCredential } from 'src/app/Models/userCredential';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserSignInServiceService {
  userCredential!: Observable<userCredential>;
  constructor(private httpClient: HttpClient) {}

  userLogin(userBodyLogin: userBodyLogin): Observable<userCredential> {
    this.userCredential = this.httpClient.post<userCredential>(
      environment.apiUri + 'api/login',
      JSON.stringify(userBodyLogin)
    );
    return this.userCredential;
  }
}
