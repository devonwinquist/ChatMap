import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // private httpClient: HttpClient;
  title = 'ChatMap';

  refObj: any = [];
  ajaxObj: any = {};

  latitude = 51.678418;
  longitude = 7.809007;
  // constructor(httpClient: HttpClient){
  //   this.httpClient = httpClient;
  // }
  // getRequest() {
  //   try {
  //     console.log(new Date());

  //     let url = "http://gordon.cs.uwec.edu:8080/CS355/Group3/";
  
  //     // HTTP GET REQUEST :: AJAX REQUEST
  
  //     let obs1 = this.httpClient.get(url);
  //     obs1.subscribe((serverData) => {
  //       console.log(serverData);
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
