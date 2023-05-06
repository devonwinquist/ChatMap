import { PostService } from './post.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component';


interface Marker {

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
  public tempTitle:any;
  public tempContent:any;
  public tempLat:any;
  public tempLong:any;

  public isAuthenticated = false;

  public username = "";


  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog, public postService: PostService) {}
 
  markers: Marker[] = [
    {
      lat: 51.678418,
      lng: 7.809007,
      title: 'Test Title',
      message: 'This is a test message',
      createdBy: 'TestUser'
    }
  ];

  addMarker(lat: number, lng: number, title: string, message: string) {
    if (this.isAuthenticated) {
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
    if (this.isAuthenticated && this.markers[index].createdBy === this.username) {
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
    const dialogRef = this._dialog.open(PostDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => this.setFields(data.title, data.message, data.latitude, data.longitude),     
    );

  }

  setFields(title:string,content:string,lat:number,long:number) {
    this.tempContent = content;
    this.tempLat = lat;
    this.tempLong = long;
    this.tempTitle = title;

  }


}
