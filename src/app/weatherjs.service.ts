import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherjsService {
  apiKey: string = environment.api_key;
  constructor(
    private _http: HttpClient
  ) { }

  dailyForecast(location: any): Observable<any> {
    return this._http.get(`https://api.weatherapi.com/v1/forecast.json?key=` + this.apiKey + `&q=` + location + `&days=3&aqi=no&alerts=no`);
  }
}
