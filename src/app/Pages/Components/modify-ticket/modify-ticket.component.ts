import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Tickets } from 'src/app/Models/Tickets';
import { CreateCommentService } from 'src/app/Services/Tickets/create-comment.service';
import { GetTicketsToGraphService } from 'src/app/Services/Tickets/get-tickets-to-graph.service';
import {
  GetUsersByProjectService,
  userByProject,
} from 'src/app/Services/Users/get-users-by-project.service';
import { selectProject } from 'src/app/State/selector/project.selector';

export interface TicketToPut {
  date: string;
  description: string;
  id: string;
  name: string;
  priority: string;
  project: string;
  state: string;
  type: string;
  user: string;
  users: string[];
}

@Component({
  selector: 'app-modify-ticket',
  templateUrl: './modify-ticket.component.html',
  styleUrls: ['./modify-ticket.component.scss'],
})
export class ModifyTicketComponent implements OnInit {
  id!: string;
  type!: string;
  priority!: string;
  name!: string;
  description!: string;
  state!: string;
  users: string[] = [];
  usersInProject!: userByProject[];
  Ticket!: Tickets;
  constructor(
    private activateRoute: ActivatedRoute,
    private getTickets: GetTicketsToGraphService,
    private createCommentService: CreateCommentService,
    private route: Router,
    private store: Store<any>,
    private getusers: GetUsersByProjectService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getTickets.getTicket(this.id).subscribe((data) => {
      this.type = data.type;
      this.priority = data.priority;
      this.name = data.name;
      this.description = data.description;
      this.state = data.state;
      data.users.map((x) => {
        this.users.push(x.id);
      });
      this.Ticket = data;
      console.log(data);
    });
    this.store.select(selectProject).subscribe((data) => {
      this.getusers.getUsers(data.id).subscribe((users) => {
        this.usersInProject = users;
      });
    });
  }
  addComment(value: any): void {
    let formattedDt = formatDate(
      new Date(this.Ticket.date),
      'yyyy-MM-dd',
      'en_US'
    );
    var ticketToPut: TicketToPut = {
      id: this.Ticket.id,
      date: formattedDt,
      description: value.description,
      name: value.name,
      priority: value.priority,
      project: this.Ticket.project,
      state: value.state,
      type: value.type,
      user: this.Ticket.user,
      users: value.users,
    };
    this.createCommentService
      .updateTicket(this.Ticket.id, ticketToPut)
      .subscribe((data) => {
        this.route.navigate(['/Home/Tickets']);
      });
  }
}
