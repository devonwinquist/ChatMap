import { MarkerService } from './../../services/marker.service';
import { LoginService } from '../../services/login.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MarkerComponent } from '../marker/component/marker.component';

export interface Marker {
  title: string;
  content: string;
  lat: number;
  lng: number;
  createdBy: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ChatMap';
  public latitude = 44.8113;
  public longitude = -91.4985;
  public isAuthenticated = false;
  public username = "";
  public isShowingLogin: boolean;
  public isShowingLogout: boolean;

  // markers: Marker[] =[
  //   {
  //     lat: 51.678418,
  //     lng: 7.809007,
  //     title: 'Test title',
  //     message: 'this is a test message',
  //     createdBy: 'test user'
  //   }
  // ]
  markers: Marker[];
  

  constructor(private _snackBar: MatSnackBar, public loginService: LoginService, private _dialog: MatDialog, public markerService: MarkerService) {

  }

  ngOnInit(): void {
      this.showAllPosts();
  }

  addMarker(title: string, content: string, lat: number, lng: number) {
    if(this.loginService.isAuthenticated) {
      const newMarker: Marker = {
        title,
        content,
        lat,
        lng,
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
    this.showAllPosts();
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
      data=>this.addMarker(data.title, data.content, data.latitude, data.longitude)
    );
  }

  markerArray: any[];

  showAllPosts() {
    this.markerService.getAllPosts().subscribe({
      next: markers => {
        console.log(markers);
        this.markerArray = markers;
      }
    })
  }
  

}
