import { Login } from './../login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD6Tz9YhGY_Ovutu1Q7fYnISfwHHksiUU0'
    }),


  ],
  providers: [],
  bootstrap: [
    AppComponent,
    Login
  ]
})
export class AppModule { }
