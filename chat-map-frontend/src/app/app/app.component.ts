import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ChatMap';

  latitude = 51.678418;
  longitude = 7.809007;

  public isAuthenticated = false;

  

  public authenticate() {

  }
}
