import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { PostService, Post } from '../post.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit{

  form: FormGroup;
  title: string;
  message: string;
  latitude: number;
  longitude: number;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PostDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, public postService: PostService) {
    this.message = data.message;
    this.title = data.title;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      title: [this.title,[]],
      message: [this.message,[]],
      latitude: [this.latitude,[]],
      longitude: [this.longitude,[]]
    });
  }

  post() {
    this.dialogRef.close(this.form.value);
    const postPost = {
      title: this.title,
      message: this.message,
      lat: this.latitude,
      lng: this.longitude,
      userId: 3
    }
    this.postService.createPost(postPost);
  }

  close() {
    this.dialogRef.close();
  }

}
