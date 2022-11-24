import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { GetTicketsToGraphService } from 'src/app/Services/Tickets/get-tickets-to-graph.service';
import { Store } from '@ngrx/store';
import { selectProject } from 'src/app/State/selector/project.selector';
import { Tickets } from 'src/app/Models/Tickets';
import { GraphModel } from 'src/app/Models/GraphModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('headerText') headerText!: ElementRef;
  @ViewChild('grid') grid!: MatGridList;
  tickets$: Tickets[] = [];
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1,
  };
  graphPriority!: GraphModel[];
  graphType!: GraphModel[];
  graphStatus!: GraphModel[];
  constructor(
    private observableMedia: MediaObserver,
    private GetTicketsToGraphService: GetTicketsToGraphService,
    private store: Store<any>
  ) {}

  createGraphModelPriority(tickets: Tickets[]): GraphModel[] {
    let graphModel: GraphModel[] = [];
    var z: Map<string, number> = new Map<string, number>();
    tickets.forEach((element) => {
      if (z.get(element.priority) == null) {
        z.set(element.priority, 1);
      } else {
        z.set(element.priority, z.get(element.priority)! + 1);
      }
    });
    z.forEach((value, name) => {
      graphModel.push({ name, value });
    });
    return graphModel;
  }
  createGraphModelStatus(tickets: Tickets[]): GraphModel[] {
    let graphModel: GraphModel[] = [];
    var z: Map<string, number> = new Map<string, number>();
    tickets.forEach((element) => {
      if (z.get(element.state) == null) {
        z.set(element.state, 1);
      } else {
        z.set(element.state, z.get(element.state)! + 1);
      }
    });
    z.forEach((value, name) => {
      graphModel.push({ name, value });
    });
    return graphModel;
  }
  createGraphModelType(tickets: Tickets[]): GraphModel[] {
    let graphModel: GraphModel[] = [];
    var z: Map<string, number> = new Map<string, number>();
    tickets.forEach((element) => {
      if (z.get(element.type) == null) {
        z.set(element.type, 1);
      } else {
        z.set(element.type, z.get(element.type)! + 1);
      }
    });
    z.forEach((value, name) => {
      graphModel.push({ name, value });
    });
    return graphModel;
  }

  ngAfterViewInit() {
    var projectId: string;
    var projectName: string;
    this.store.select(selectProject).subscribe((data) => {
      projectId = data.id;
      projectName = data.name;
      if (projectId != '') {
        this.GetTicketsToGraphService.getTickets(projectId).subscribe(
          (data) => {
            if (data.length > 0) {
              this.tickets$ = [...data];
              this.graphType = this.createGraphModelPriority(this.tickets$);
              this.graphPriority = this.createGraphModelStatus(this.tickets$);
              this.graphStatus = this.createGraphModelType(this.tickets$);
            } else {
              this.headerText.nativeElement.textContent =
                'Project ' + projectName + ' does not have any tickets';
            }
          }
        );
        this.headerText.nativeElement.textContent =
          'Graphics from project ' + projectName;
      } else {
        this.headerText.nativeElement.textContent = 'Not Project Selected';
      }
    });
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.observableMedia
      .asObservable()
      .subscribe((data: Array<MediaChange>) => {
        const media = data.find((x) => x.priority)?.mqAlias;
        let result2 = 0;

        Object.entries(this.gridByBreakpoint).find(([key, value]) => {
          if (key === media) {
            result2 = value;
            return true;
          }
          return false;
        });
        this.grid.cols = result2;
      });
  }
}
