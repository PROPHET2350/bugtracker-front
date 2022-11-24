import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/Admin/Roles';
import { Users } from 'src/app/Models/Admin/Users';
import { FlashService } from 'src/app/Services/flash.service';
import { UsersAdminActionsService } from 'src/app/Services/Users/users-admin-actions.service';
import { v4 } from 'uuid';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'roles', 'actions'];
  dataSource = new MatTableDataSource<any>();
  UserDialog!: MatDialogRef<AddUserDialogComponent>;
  Users: Users[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private usersAdminActionsService: UsersAdminActionsService,
    public dialog: MatDialog,
    private flash: FlashService,
    private route: Router
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.usersAdminActionsService.getAllUsers().subscribe((data) => {
      data.map((x) => {
        this.Users.push({
          id: x.id,
          username: x.username,
          roles: Role[x.roles[0]],
        });
      });
      this.dataSource = new MatTableDataSource(this.Users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddUserDialog(): void {
    this.UserDialog = this.dialog.open(AddUserDialogComponent);
    this.UserDialog.afterClosed().subscribe((data) => {
      if (data) {
        if (!this.Users.find((x) => x.username === data.username)) {
          let user: Users = {
            id: v4(),
            username: data.username,
            roles: [data.rol],
            password: data.password,
          };
          this.Users.push({ ...user, roles: Role[data.rol] });
          this.flash.success('User has been created successfully', 'Users');
          this.refreshTable();
          this.usersAdminActionsService
            .createUser(user)
            .subscribe((data) => {});
        } else {
          this.flash.error(
            `User with username ${data.username} already exists`,
            'Users'
          );
        }
      }
    });
  }
  deleteUsers(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.Users = this.Users.filter((user) => user.id !== id);
      this.refreshTable();
      this.usersAdminActionsService.deleteUser(id).subscribe((data) => {
        this.flash.success('User has been deleted successfully', 'Users');
      });
    }
  }
  resetUsersPassword(id: string) {
    this.route.navigate(['Home/User/' + id]);
  }
  refreshTable() {
    this.dataSource.data = this.Users;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
