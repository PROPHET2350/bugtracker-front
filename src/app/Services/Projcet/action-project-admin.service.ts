import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects, ProjectToPost } from 'src/app/Models/Admin/Projects';
import { Users } from 'src/app/Models/Admin/Users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActionProjectAdminService {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Projects[]> {
    return this.httpClient.get<Projects[]>(environment.apiUri + 'projects');
  }
  getAllUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(environment.apiUri + 'users', {
      headers: { hideLoader: 'true' },
    });
  }
  createProject(project: ProjectToPost): Observable<Projects> {
    return this.httpClient.post<Projects>(
      environment.apiUri + 'project/add',
      JSON.stringify(project),
      {
        headers: { hideLoader: 'true' },
      }
    );
  }
  deleteProject(id: string): Observable<Projects> {
    return this.httpClient.delete<Projects>(
      environment.apiUri + 'project/' + id,
      {
        headers: { hideLoader: 'true' },
      }
    );
  }

  updateUsers(users: string[], id: string): Observable<Projects> {
    return this.httpClient.put<Projects>(
      environment.apiUri + 'project-users/' + id,
      JSON.stringify({ users: users }),
      {
        headers: { hideLoader: 'true' },
      }
    );
  }
}
