import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import * as Chart from 'chart.js';

import { map } from 'rxjs/operators';
import { WeatherjsService } from './weatherjs.service';

import { ProgressBarMode } from '@angular/material/progress-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  chart: any

  title = "";
  alldates: any;

  form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _wheather: WeatherjsService,
  ) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      location: ['Turkmenistan', [Validators.required, Validators.maxLength(255)]]
    });
    this.getData()

  }
  getData() {
    this.title = this.form.value.location;
    if (this.form.value.location) {
      this._wheather.dailyForecast(this.form.value.location)
        .subscribe(resp => {
          let temp_max = resp['forecast']['forecastday'].map((x: any) => x.day.maxtemp_c)
          let temp_min = resp['forecast']['forecastday'].map((x: any) => x.day.mintemp_c)
          this.alldates = resp['forecast']['forecastday'].map((x: any) => x.date)

          let weatherDates = this.alldates
          this.alldates.forEach((date: number) => {
            // let jsdate = new Date(date * 1000);
            // weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
            this.chart = new Chart('canvas', {
              type: 'line',
              data: {
                labels: weatherDates,
                datasets: [
                  {
                    data: temp_max,
                    borderColor: '#FF0000',
                    fill: false
                  },
                  {
                    data: temp_min,
                    borderColor: '#0000FF',
                    fill: false
                  },
                ]
              },
              options: {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }]
                }
              }
            })


          });
        })
    }

  }
}
