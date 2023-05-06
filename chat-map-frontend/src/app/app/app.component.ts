import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  constructor(private _snackBar: MatSnackBar) {}

}
