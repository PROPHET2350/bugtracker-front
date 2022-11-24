import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projects, ProjectToPost } from 'src/app/Models/Admin/Projects';
import { Users } from 'src/app/Models/Admin/Users';
import { ActionProjectAdminService } from 'src/app/Services/Projcet/action-project-admin.service';
import { userByProject } from 'src/app/Services/Users/get-users-by-project.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss'],
})
export class AddProjectDialogComponent implements OnInit {
  name!: string;
  userToPost: userByProject[] = [];
  users: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users[],
    private projectActionService: ActionProjectAdminService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  save(form: NgForm) {
    if (form.valid) {
      let id = v4();
      let name = form.value.name;
      let project: Projects = {
        id: id,
        name: name,
        users: this.userToPost,
      };
      let projectToPost: ProjectToPost = {
        id: id,
        name: name,
        users: this.users,
      };
      this.projectActionService
        .createProject(projectToPost)
        .subscribe((data) => {
          console.log(data);
        });
      this.dialogRef.close(project);
    }
  }

  addUser(e: MouseEvent, id: string, username: string) {
    if (this.userToPost.find((u) => u.id === id)) {
      this.userToPost = this.userToPost.filter((user) => user.id !== id);
    } else {
      this.userToPost.push({ id: id, name: username });
    }
    console.log(this.userToPost);
  }
}
