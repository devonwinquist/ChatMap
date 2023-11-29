import { LoginService } from '../../../services/login.service';
import { Component, Inject, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  image: string;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  isDraggedOver: boolean = false;
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ReportComponent>, @Inject(MAT_DIALOG_DATA) data: any, public reportService: ReportService, public loginService: LoginService, private renderer: Renderer2) {
    this.title = data.title;
    this.content = data.message;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.userId = data.userId;
    this.image = data.image;
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
      userId: [this.userId, []],
      file: [null],
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImage = files[0];
      this.updatePreview();
    }
  }

  updatePreview(): void {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        console.log('Preview URL:', this.previewUrl);
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  getImageUrl(): string | null {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return null;
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = true;
}

onFileDropped(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    this.selectedImage = files[0];
    this.updatePreview();
    this.form.get('file')?.setValue(this.selectedImage);
  }
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