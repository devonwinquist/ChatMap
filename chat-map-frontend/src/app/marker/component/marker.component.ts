import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MarkerService } from 'src/services/marker.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit{
  form: FormGroup;
  title: string;
  message: string;
  latitude: number;
  longitude: number;
  createdBy: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<MarkerComponent>, @Inject(MAT_DIALOG_DATA) data: any, public markerService: MarkerService) {
    this.title = data.title;
    this.message = data.message;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      title: [this.title,[]],
      content: ["my content",[]],
      latitude: [this.latitude,[]],
      longitude: [this.longitude,[]],
      userEntityId: 3
    });
  }

  post() {
    this.dialogRef.close(this.form.value);
    const myPost = {
      title: this.title,
      content: this.message,
      latitude: this.latitude,
      longitude: this.longitude,
      userEntityId: 3
    }
    console.log("hello");
    this.markerService.createPost(this.form.value).pipe(
      map(post => console.log("success"))
    ).subscribe( () => {
      console.log("look in db");
    })
  }

  close() {
    this.dialogRef.close();
  }
}
