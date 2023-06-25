import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  temperatureInCelsius: number = 0;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData('Klaipeda');
  }

  getWeatherData(city: string): void {
    this.weatherService.getWeather(city)
      .subscribe((data: any) => {
        this.weatherData = data;
        this.temperatureInCelsius = this.weatherService.convertKelvinToCelsius(data.main.temp);
        console.log(this.weatherData);
      }, (error: any) => {
        console.error('Error fetching weather data:', error);
      });
  }

  getWeatherIcon(iconCode: string): string {
    let iconPath = '';
  
    switch (iconCode) {
      case '01d':
        iconPath = 'assets/icons/cloud-sun-solid.svg';
        break;
      case '01n':
        iconPath = 'assets/icons/cloud-moon-solid.svg';
        break;
      case '02d':
      case '04d':
      case '04n':
        iconPath = 'assets/icons/clouds.svg';
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        iconPath = 'assets/icons/cloud-rain-solid.svg';
        break;
      case '11d':
      case '11n':
        iconPath = 'assets/icons/cloud-bolt-solid.svg';
        break;
      case '13d':
      case '13n':
        iconPath = 'assets/icons/snowflake-solid.svg';
        break;
      case '50d':
      case '50n':
        iconPath = 'assets/icons/mist-solid.svg';
        break;
      default:
        iconPath = 'assets/icons/circle-question-solid.svg';
        break;
    }
  
    return iconPath;
  }
  
}
