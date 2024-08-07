import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  [x: string]: any;
  private apiKey: string = '9dc92770c957025eb4e9cedb0c6d6734'; // Replace with your actual API key
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/forecast'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}
// method to get weather by city from the API qui permet de loader les coordonnes des villes dans l'API
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http
      .get<any>(url)
      .pipe(map((data) => this.extractDailyForecast(data)));
  }
// method to get weather by coordinates from the API qui permet de loader les coordonnes des villes dans l'API
  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http
      .get<any>(url)
      .pipe(map((data) => this.extractDailyForecast(data)));
  }

  // Extract the daily forecast from the API response
  private extractDailyForecast(data: any): any {
    const dailyData = [];
    const forecastList = data.list;

    // Iterate through the forecast list and pick one entry per day
    let currentDay = null;
    for (let forecast of forecastList) {
      const date = new Date(forecast.dt_txt);
      const day = date.getDate();
      const hour = date.getHours();

      // Choose the forecast closest to 12:00 PM (noon)
      if (day !== currentDay && hour >= 12) {
        dailyData.push(forecast);   
        currentDay = day;
      }
    }
// methode qui permet de deplacer les 8 premières heures pour avoir les 8 dernieres horaires et non les 8 premieres returnes dans le tableau
    return {
      city: data.city, // Nom de la ville
      current: data.list[0], // Prend la premiere horaire
      hourly: dailyData.slice(0, 8), // Prend les 8 premières prévisions horaires
      daily: dailyData // Toutes les horaires
    };
  }

}
