import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD6Tz9YhGY_Ovutu1Q7fYnISfwHHksiUU0'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
