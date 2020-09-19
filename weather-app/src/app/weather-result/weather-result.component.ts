import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit {
  @Input() weatherData;

  constructor() { }

  ngOnInit(): void {
  }

}
