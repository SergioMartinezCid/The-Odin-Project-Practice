import { Component, OnInit, Input } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
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
  async queryServer(): Promise<void>{
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.countryText},${this.cityText}` +
        `&appid=9d94d2238591f4e09c847ebae88c0b7f`);
      const jsonObject = await response.json();
      this.weatherData.phenomenon = jsonObject.weather['0'].main;
      const celsius: number = (Number.parseFloat(jsonObject.main.temp) * 100 - 27315) / 100;

      if (this.fahrenheit){
        this.weatherData.temperature = `${(celsius * 9 / 5) + 32} ºF`;
      } else{
        this.weatherData.temperature = `${celsius} ºC`;
      }
    } catch (error) {
      alert(error.message);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
