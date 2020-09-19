import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherData = {temperature: 'No temperature received', phenomenon: 'No phenomenon received'};
  title = 'weather-app';
}
