import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { comments } from 'src/app/Models/comments';
import { ProjecetSelected } from 'src/app/Models/ProjectSelected';
import { Tickets } from 'src/app/Models/Tickets';
import { CreateCommentService } from 'src/app/Services/Tickets/create-comment.service';
import { GetCommentsService } from 'src/app/Services/Tickets/get-comments.service';
import { GetTicketsToGraphService } from 'src/app/Services/Tickets/get-tickets-to-graph.service';
import { GetUsersByProjectService } from 'src/app/Services/Users/get-users-by-project.service';
import { selectProject } from 'src/app/State/selector/project.selector';
import { selectUsers } from 'src/app/State/selector/user.selector';
import { v4 as uuidv4 } from 'uuid';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  Tickets$: Tickets[] = [];
  Ticket!: Tickets | undefined;
  comments: comments[] = [];
  user$: any = null;
  displayedColumns: string[] = ['name', 'description', 'author', 'actions'];
  dataSource = new MatTableDataSource(this.Tickets$);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private GetTicketsToGraphService: GetTicketsToGraphService,
    private store: Store<any>,
    private GetCommentsService: GetCommentsService,
    private createCommentService: CreateCommentService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private route: Router,
    private getusers: GetUsersByProjectService
  ) {
    this.store.select(selectUsers).subscribe((user) => {
      this.user$ = user;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.select(selectProject).subscribe((data) => {
      this.GetTicketsToGraphService.getTickets(data.id).subscribe((data) => {
        this.Tickets$ = [...data];
        this.dataSource.data = this.Tickets$;
      });
    });
  }
  openDialog() {
    var project!: ProjecetSelected;
    this.store.select(selectProject).subscribe((data) => {
      project = data;
      this.getusers.getUsers(data.id).subscribe((data) => {
        let dialogData = this.dialog.open(AddTicketDialogComponent, {
          data: data,
        });
        var type!: string;
        var priority!: string;
        var name!: string;
        var description!: string;
        dialogData.afterClosed().subscribe((data) => {
          if (data) {
            type = data.type;
            priority = data.priority;
            name = data.name;
            description = data.description;
            let formattedDt = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
            var id = uuidv4();
            var Ticket: Tickets = {
              date: formattedDt,
              description: description,
              id: id,
              name: name,
              priority: priority,
              project: project.id,
              state: 'active',
              type: type,
              user: this.user$.id,
              users: data.users,
            };
            this.createCommentService.createTicket(Ticket).subscribe((data) => {
              this.Tickets$.push(data);
              this.dataSource.data = this.Tickets$;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          }
        });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ticketShowInformations(id: string) {
    this.comments = [];
    this.Ticket = this.Tickets$.find((x) => x.id === id)!;
    this.GetCommentsService.getComments(id).subscribe((data) => {
      this.comments = [...data];
    });
  }
  addComment(value: any): void {
    if (confirm('Are you sure you want to add this comment')) {
      let description = value.comment;
      var id = uuidv4();
      let newComment: comments = {
        id: id,
        author: this.user$.username,
        description: description,
        name: 'add',
        ticket: this.Ticket!.id,
      };
      let Comment: comments = {
        id: id,
        author: this.user$.id,
        description: description,
        name: 'name add',
        ticket: this.Ticket!.id,
      };
      this.comments.push(newComment);
      this.createCommentService.createComment(Comment).subscribe((data) => {});
    }
  }
  isAdmin() {
    return this.user$.roles.includes('ROLE_ADMIN');
  }
  deleteticket(id: string) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.Tickets$ = this.Tickets$.filter((t) => t.id != id);
      this.dataSource = new MatTableDataSource(this.Tickets$);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.createCommentService.deleteTicket(id).subscribe((data) => {});
      if (this.Ticket) {
        this.Ticket = undefined;
      }
    }
  }
  navegateToModify(id: string) {
    this.route.navigate(['Home/Ticket/' + id]);
  }
}
