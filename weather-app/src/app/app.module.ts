import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { WeatherResultComponent } from './weather-result/weather-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    WeatherResultComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
