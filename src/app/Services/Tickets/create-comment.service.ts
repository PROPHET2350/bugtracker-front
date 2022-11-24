import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comments } from 'src/app/Models/comments';
import { Tickets } from 'src/app/Models/Tickets';
import { TicketToPut } from 'src/app/Pages/Components/modify-ticket/modify-ticket.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateCommentService {
  constructor(private http: HttpClient) {}

  createComment(comment: comments): Observable<comments> {
    return this.http.post<comments>(
      environment.apiUri + 'ticket-comment/add',
      JSON.stringify(comment),
      { headers: { hideLoader: 'true' } }
    );
  }

  createTicket(ticket: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(
      environment.apiUri + 'ticket/add',
      JSON.stringify(ticket),
      { headers: { hideLoader: 'true' } }
    );
  }

  deleteTicket(id: string): Observable<Tickets> {
    return this.http.delete<Tickets>(environment.apiUri + `ticket/${id}`, {
      headers: { hideLoader: 'true' },
    });
  }
  updateTicket(id: string, ticket: TicketToPut): Observable<TicketToPut> {
    return this.http.put<TicketToPut>(
      environment.apiUri + `ticket/${id}`,
      JSON.stringify(ticket)
    );
  }
}
