import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comments } from 'src/app/Models/comments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetCommentsService {
  constructor(private http: HttpClient) {}

  getComments(id: string): Observable<comments[]> {
    return this.http.get<comments[]>(
      environment.apiUri + `ticket-comment/ticket/${id}`
    );
  }
}
