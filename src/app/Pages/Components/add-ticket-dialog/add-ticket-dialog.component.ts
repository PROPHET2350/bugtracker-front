import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userByProject } from 'src/app/Services/Users/get-users-by-project.service';

@Component({
  selector: 'app-add-ticket-dialog',
  templateUrl: './add-ticket-dialog.component.html',
  styleUrls: ['./add-ticket-dialog.component.scss'],
})
export class AddTicketDialogComponent implements OnInit {
  type!: string;
  priority!: string;
  name!: string;
  description!: string;
  users: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userByProject[]
  ) {}

  ngAfterViewInit() {}
  ngOnInit(): void {}
  save(form: NgForm): void {
    if (form.form.status === 'VALID') {
      this.dialogRef.close(form.value);
    }
  }
}
