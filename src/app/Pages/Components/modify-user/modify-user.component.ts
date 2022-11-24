import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { inverseRole, Role, Roles } from 'src/app/Models/Admin/Roles';
import { FlashService } from 'src/app/Services/flash.service';
import { UsersAdminActionsService } from 'src/app/Services/Users/users-admin-actions.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss'],
})
export class ModifyUserComponent implements OnInit {
  id!: string;
  password!: string;
  confirmPassword!: string;
  inputType: string = 'password';
  constructor(
    private activateRoute: ActivatedRoute,
    private usersAdminActionsService: UsersAdminActionsService,
    private flash: FlashService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.usersAdminActionsService.getUser(this.id).subscribe((data) => {});
  }
  modifyRol(form: NgForm) {
    if (this.password !== this.confirmPassword) {
      this.flash.warning("Password aren't not equal", 'Password');
    } else {
      this.usersAdminActionsService
        .resertPassword(this.id, this.password)
        .subscribe((data) => {
          console.log(data);
        });
      this.route.navigate(['Home/Users']);
    }
  }
  handleChangeInputPasswordType(type: string): void {
    this.inputType = type;
  }
}
