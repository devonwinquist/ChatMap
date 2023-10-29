import { ReportService } from '../../services/report.service';
import { LoginService } from '../../services/login.service';
import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ReportComponent } from '../report/component/report.component';

export interface Report {
  title: string;
  content: string;
  lat: number;
  lng: number;
  userId: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Road Report';
  public latitude = 44.8113;
  public longitude = -91.4985;
  public isAuthenticated = false;
  public username = "";
  public isShowingLogin: boolean;
  public isShowingLogout: boolean;
  public reports: Report[];
  public window: Window;
  public ImagePath: string
  public reportArray: any[];
  
  constructor(private _snackBar: MatSnackBar, public loginService: LoginService, private _dialog: MatDialog, public reportService: ReportService) {}
  
  ngOnInit(): void {
    this.showAllReports();
    this.reports = [];
    this.ImagePath="../../assets/RoadReport.png";
  }

  ngOnChanges(): void {
    this.showAllReports();
  }

  addMarker(title: string, content: string, lat: number, lng: number, userId: any) {
    if(this.loginService.isAuthenticated) {
      const newReport: Report = {
        title,
        content,
        lat,
        lng,
        userId
      };
      this._snackBar.open('Report has been submitted.', 'Dismiss', {
        duration: 5000
      });
      this.reports.push(newReport);
      this.showAllReports();
    } else {
      this._snackBar.open('You must be logged in to make a report.', 'Dismiss', {
        duration: 5000
      });
    }
    
  }

  deleteMarker(index: number) {
    if(this.loginService.isAuthenticated) {
      this.reports.splice(index, 1);
      this._snackBar.open('Message deleted successfully!', 'Dismiss', {
        duration: 5000
      });
    } else {
      this._snackBar.open('You are not authorized to delete this message.', 'Dismiss', {
        duration: 5000
      });
    }
  }

  onMapClick($event: google.maps.MouseEvent) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: 2,
      help: 'Report Form'
    };
    const dialogRef = this._dialog.open(ReportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>this.addMarker(data.title, data.content, data.latitude, data.longitude, data.userId)
    );
  }

  onDrag($event: MouseEvent) {
    // TODO
  }

  logout() {
    if(this.loginService.isAuthenticated) {
      this.loginService.logout();
    }
  }

  showAllReports() {
    this.reportService.getAllReports().subscribe({
      next: reports => {
        //console.log(markers);
        this.reportArray = reports
      }
    })
  }
}