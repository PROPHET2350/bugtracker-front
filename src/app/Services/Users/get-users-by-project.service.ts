import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/Models/Admin/Users';
import { environment } from 'src/environments/environment';

export interface userByProject {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GetUsersByProjectService {
  constructor(private httpClient: HttpClient) {}

  getUsers(id: string): Observable<userByProject[]> {
    return this.httpClient.get<userByProject[]>(
      environment.apiUri + `project/${id}`,
      { headers: { hideLoader: 'true' } }
    );
  }

  getUser(id: string): Observable<Users> {
    return this.httpClient.get<Users>(environment.apiUri + '/user/' + id);
  }
}
