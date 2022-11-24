import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/Models/Admin/Users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersAdminActionsService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(environment.apiUri + 'users');
  }
  getUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(environment.apiUri + 'user/' + id);
  }

  createUser(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(
      environment.apiUri + 'user/add',
      JSON.stringify(user),
      { headers: { hideLoader: 'true' } }
    );
  }

  deleteUser(id: string): Observable<Users> {
    return this.httpClient.delete<Users>(environment.apiUri + 'user/' + id, {
      headers: { hideLoader: 'true' },
    });
  }

  resertPassword(id: string, password: string): Observable<Users> {
    return this.httpClient.put<Users>(environment.apiUri + 'user-reset/' + id, {
      password: password,
    });
  }
}
