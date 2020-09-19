import { Component, OnInit, Input } from '@angular/core';
import { countries, cities } from '../cities';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Input() weatherData;
  countries = countries;
  cities = cities;
  fahrenheit = false;

  countryText = '';
  cityText = '';
  countryIndex = -1;
  cityIndex = -1;

  updateCountry(): void{
    this.countryText = (document.querySelector('.input-country') as HTMLInputElement).value;
    this.countryIndex = countries.indexOf(this.countryText);
  }
  updateCity(): void{
    this.cityText = (document.querySelector('.input-city') as HTMLInputElement).value;
    if (this.countryIndex === -1){
      this.cityIndex = -1;
    }else{
      this.cityIndex = cities[this.countryIndex].indexOf(this.cityText);
    }
  }
  queryServer(): void{
    // TODO
    this.weatherData.temperature = '18 ºF';
    this.weatherData.phenomenon = 'Light rain';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
