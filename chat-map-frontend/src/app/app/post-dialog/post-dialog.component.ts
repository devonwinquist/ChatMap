import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit{

  form: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PostDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      message: [this.message,[]],
    });
  }

  post() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
