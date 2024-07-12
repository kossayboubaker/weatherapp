import { Component } from '@angular/core';
import { WeatherService } from './Weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
dailyForecast: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  city: string = '';
  currentWeather: any;
  hourlyForecast: any;
  weeklyForecast: any;

  constructor(private weatherService: WeatherService) { }

  searchWeather() {
    this.weatherService.getWeatherByCity(this.city).subscribe(
      weatherData => {
        this.currentWeather = weatherData.current;
        this.hourlyForecast = weatherData.hourly;
        this.weeklyForecast = weatherData.daily;
      },
      error => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  getTemperatureIcon(description: string): string {
    switch (description.toLowerCase()) {
      case 'clear sky':
      return 'https://media.istockphoto.com/id/1208368568/photo/dramatic-sunset-and-sunrise-sky-nature-background-with-white-clouds.jpg?s=612x612&w=0&k=20&c=mu12e5RAWbRKShGqpuRtNJHN7ZXHiohsmSBFbUXchT4=';
      case 'few clouds':

      case 'broken clouds':
      return'https://www.google.fr/url?sa=i&url=https%3A%2F%2Fwww.freeimages.com%2Fphoto%2Fbroken-clouds-1537880&psig=AOvVaw15tBu7YZRAwz3-Z7ZV2kxG&ust=1720828755011000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCxvuaYoIcDFQAAAAAdAAAAABAF';
      case 'overcast clouds':
      return 'data:image/png;base64,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';
      case 'light rain':
      case 'moderate rain':

      case 'heavy intensity rain':
      return 'https://www.shutterstock.com/image-vector/rain-icon-trendy-flat-style-600nw-421269391.jpg';
      case 'snow':
      case 'light snow':
      return 'https://images.unsplash.com/photo-1598347104365-2263f1870f8a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'heavy snow':
      return 'https://as1.ftcdn.net/v2/jpg/01/99/63/42/1000_F_199634231_Ud905d27A72yRlueUhYHMVg6kuxrtmVE.jpg';
      default:
      return 'https://www.shutterstock.com/image-vector/rain-icon-trendy-flat-style-600nw-421269391.jpg';
    }
  }
}
