import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterProtectorByCookieGuard } from 'src/app/Guard/router-protector-by-cookie.guard';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { ModifyTicketComponent } from '../Components/modify-ticket/modify-ticket.component';
import { ModifyUserComponent } from '../Components/modify-user/modify-user.component';
import { ProjectsComponent } from '../Components/projects/projects.component';
import { TicketsComponent } from '../Components/tickets/tickets.component';
import { UsersComponent } from '../Components/users/users.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [RouterProtectorByCookieGuard],
    children: [
      {
        path: 'Dashboard',
        title: 'Grafics',
        component: DashboardComponent,
        canActivate: [RouterProtectorByCookieGuard],
      },
      {
        path: 'Tickets',
        title: 'Tickets',
        component: TicketsComponent,
        canActivate: [RouterProtectorByCookieGuard],
      },
      {
        path: 'Ticket/:id',
        title: 'Modify Ticket',
        component: ModifyTicketComponent,
        canActivate: [RouterProtectorByCookieGuard],
      },
      {
        path: 'Users',
        title: 'Users',
        component: UsersComponent,
        canActivate: [RouterProtectorByCookieGuard],
      },
      {
        path: 'User/:id',
        title: 'Modify User',
        component: ModifyUserComponent,
        canActivate: [RouterProtectorByCookieGuard],
      },
      {
        path: 'Projects',
        title: 'Projects',
        component: ProjectsComponent,
        canActivate: [RouterProtectorByCookieGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
