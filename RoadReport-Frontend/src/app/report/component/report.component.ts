import { LoginService } from '../../../services/login.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ReportService } from 'src/services/report.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit{
  form: FormGroup;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  userId: number;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ReportComponent>, @Inject(MAT_DIALOG_DATA) data: any, public reportService: ReportService, public loginService: LoginService) {
    this.title = data.title;
    this.content = data.message;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.loginService.getCurrentUser(this.loginService.getEmail());
    this.userId = this.reportService.getUserId();
    this.getCoordinates();
    this.form=this.fb.group({
      title: [this.title,[]],
      content: [this.content,[]],
      latitude: [this.latitude,[]],
      longitude: [this.longitude,[]],
      userId: [this.userId, []]
    });
  }

  submitReport() {
    this.dialogRef.close(this.form.value);
    if(this.loginService.isAuthenticated) {
      this.reportService.createReport(this.form.value).pipe(
        map(report => console.log("success"))
      ).subscribe( () => {
        console.log("Report submission successful.");
        window.location.reload();
      });
    }
  }

  getCoordinates() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.log('Error getting coordinates:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  close() {
    this.dialogRef.close();
  }
}