import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { SelectedProjectToGlobalStorage } from 'src/app/State/accion/project.accion';
import {
  selectUsersTeam,
  selectUsers,
} from 'src/app/State/selector/user.selector';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$: any = null;
  teams$: any = null;
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  constructor(
    private store: Store<any>,
    private toast: ToastrService,
    private router: Router
  ) {
    this.store.select(selectUsersTeam).subscribe((team) => {
      this.teams$ = team;
    });
    this.store.select(selectUsers).subscribe((user) => {
      this.user$ = user;
    });
  }

  isAdmin() {
    return this.user$.roles.includes('ROLE_ADMIN');
  }

  ngOnInit(): void {}

  onClickButtonProjecChange(id: string) {
    let projects: Array<any> = this.teams$;
    let project = projects.find((p) => p.id === id);
    localStorage.setItem('project', JSON.stringify(project));
    this.store.dispatch(SelectedProjectToGlobalStorage({ project }));
    this.toast.info('Project have been changed successfully', 'Project', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/Home/Dashboard']);
    });
  }
}
