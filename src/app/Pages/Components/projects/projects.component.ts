import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Projects } from 'src/app/Models/Admin/Projects';
import { Users } from 'src/app/Models/Admin/Users';
import { FlashService } from 'src/app/Services/flash.service';
import { ActionProjectAdminService } from 'src/app/Services/Projcet/action-project-admin.service';
import { userByProject } from 'src/app/Services/Users/get-users-by-project.service';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'users', 'actions'];
  dataSource = new MatTableDataSource<any>();
  Projects: Projects[] = [];
  Project!: Projects;
  users: string[] = [];
  UsersToAdd: Users[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private actionsProjectAdminService: ActionProjectAdminService,
    public dialog: MatDialog,
    private flash: FlashService
  ) {}

  ngOnInit(): void {
    this.actionsProjectAdminService.getProjects().subscribe((data) => {
      this.Projects = data;
      this.refreshTable();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddUserDialog(): void {
    this.actionsProjectAdminService.getAllUsers().subscribe((data) => {
      let dialogRef = this.dialog.open(AddProjectDialogComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe((data: Projects) => {
        this.Projects.push(data);
        this.refreshTable();
      });
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project')) {
      this.Projects = this.Projects.filter((project) => project.id !== id);
      console.log(this.Projects.filter((project) => project.id !== id));
      console.log(this.Projects);
      this.refreshTable();
      this.actionsProjectAdminService.deleteProject(id).subscribe((data) => {
        this.flash.success(
          `Project with name ${data.name} has been deleted successfully`,
          'Project'
        );
      });
    }
  }

  showProjectDetails(id: string) {
    this.Project = this.Projects.find((p) => p.id === id)!;
    this.actionsProjectAdminService.getAllUsers().subscribe((data: Users[]) => {
      this.Project.users.map((user) => {
        data = data.filter((d) => d.username !== user.name);
      });
      this.UsersToAdd = data;
      console.log(this.UsersToAdd);
    });
  }

  addUserToProject() {
    this.users.map((user) => {
      let x = this.UsersToAdd.find((u) => u.id === user)!;
      this.UsersToAdd = this.UsersToAdd.filter((u) => u.id !== user)!;
      this.Project.users.push({ id: x.id, name: x.username });
      this.users = [];
    });
    var us: string[] = [];
    this.Project.users.map((l) => {
      us.push(l.id);
    });

    this.actionsProjectAdminService
      .updateUsers(us, this.Project.id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteUser(id: string) {
    let x = this.Project.users.find((x) => x.id === id)!;
    this.Project.users = this.Project.users.filter((u) => u.id !== id);
    this.UsersToAdd.push({ id: x.id, username: x.name, roles: [] });
    var us: string[] = [];

    this.Project.users.map((l) => {
      us.push(l.id);
    });

    this.actionsProjectAdminService
      .updateUsers(us, this.Project.id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  refreshTable() {
    this.dataSource.data = this.Projects;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
