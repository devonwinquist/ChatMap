import { MarkerService } from './../../services/marker.service';
import { LoginService } from '../../services/login.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MarkerComponent } from '../marker/component/marker.component';

export interface Marker {
  lat: number;
  lng: number;
  title: string;
  message: string;
  createdBy: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ChatMap';
  public latitude = 51.678418;
  public longitude = 7.809007;
  public isAuthenticated = false;
  public username = "";
  public isShowingLogin: boolean;
  public isShowingLogout: boolean;

  markers: Marker[] =[
    {
      lat: 51.678418,
      lng: 7.809007,
      title: 'Test title',
      message: 'this is a test message',
      createdBy: 'test user'
    }
  ]
  

  constructor(private _snackBar: MatSnackBar, public loginService: LoginService, private _dialog: MatDialog, public markerService: MarkerService) {

  }

  addMarker(lat: number, lng: number, title: string, message: string, createdBy: string) {
    if(this.loginService.isAuthenticated) {
      const newMarker: Marker = {
        lat,
        lng,
        title,
        message,
        createdBy: this.username
      };
      this.markers.push(newMarker);
      this._snackBar.open('Message added successfully!', 'Dismiss', {
        duration: 5000
      });
    } else {
      this._snackBar.open('You must be logged in to add a message.', 'Dismiss', {
        duration: 5000
      });
    }
  }

  deleteMarker(index: number) {
    if(this.loginService.isAuthenticated && this.markers[index].createdBy === this.username) {
      this.markers.splice(index, 1);
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
      help: 'Post Form'
    };
    const dialogRef = this._dialog.open(MarkerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>this.addMarker(data.latitude, data.longitude, data.title, data.message, data.createdBy),
    );
    console.log(this.markers);
  }
  

}
