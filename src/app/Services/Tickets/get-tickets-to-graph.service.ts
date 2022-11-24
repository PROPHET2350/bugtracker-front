import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tickets } from 'src/app/Models/Tickets';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetTicketsToGraphService {
  constructor(private http: HttpClient) {}

  getTickets(id: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(environment.apiUri + `tickets/${id}`);
  }
  getTicketsWR(id: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(environment.apiUri + `tickets/${id}`, {
      headers: { hideLoader: 'true' },
    });
  }

  getTicket(id: string): Observable<Tickets> {
    return this.http.get<Tickets>(environment.apiUri + `real-ticket/${id}`);
  }
}
