import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { GraphCardComponent } from '../Components/graph-card/graph-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { TicketsComponent } from '../Components/tickets/tickets.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { AddTicketDialogComponent } from '../Components/add-ticket-dialog/add-ticket-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ModifyTicketComponent } from '../Components/modify-ticket/modify-ticket.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsersComponent } from '../Components/users/users.component';
import { AddUserDialogComponent } from '../Components/add-user-dialog/add-user-dialog.component';
import { ModifyUserComponent } from '../Components/modify-user/modify-user.component';
import { ProjectsComponent } from '../Components/projects/projects.component';
import { AddProjectDialogComponent } from '../Components/add-project-dialog/add-project-dialog.component';
@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    GraphCardComponent,
    TicketsComponent,
    AddTicketDialogComponent,
    ModifyTicketComponent,
    UsersComponent,
    AddUserDialogComponent,
    ModifyUserComponent,
    ProjectsComponent,
    AddProjectDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    NgxChartsModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatTreeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [],
})
export class HomeModule {}
