import { LoginService } from './../login/login.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public isShowingLogin: boolean;
  public isShowingLogout: boolean;
  

  // if logged in when click create account, prompt log out

  // if logged in hide login button and show logout button instead



  constructor(private _snackBar: MatSnackBar, public loginService: LoginService) {

  }

  

}
