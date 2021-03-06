import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Events} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {SandboxPage} from '../sandbox/sandbox'
import {calendarModel} from '../../models/calendarModel'
import {weatherModel} from '../../models/weatherModel'
import {forecastModel} from '../../models/forecastModel'
import {hourlyModel} from '../../models/hourlyModel'
import {clockPage} from "../home/clock" // only so that it works offline

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

  recievedData: any;
  recievedWeather: any;
  recievedHourly: any;
  recievedForecast: any;
  email_1: string = 'dzutpham@gmail.com';
  apiKeyCal: string = 'AIzaSyAT85ggW19Y2_4i2bGPZ_O2hBTcN94wBHY';
  //apiKeyW: string = '61e9b5e1f5096d77dbd8dc5faf674e43';
  apiKeyW: string = 'b65cd3c940b29e88';
  timeMin: string = '2016-08-04T19%3A36%3A34%2B00%3A00';
  //timeMin: string = '2016-08-04T19:36:34+00:00';
  maxEvents: string = '10';
  city: string = 'Florissant'
  state: string = 'MO'

  calendarItems: Array<calendarModel> = new Array<calendarModel>();
  currentWeather: Array<weatherModel> = new Array<weatherModel>();
  hourlyWeather: Array<hourlyModel> = new Array<hourlyModel>();
  forecast: Array<forecastModel> = new Array<forecastModel>();


  // Gotta build url string
  urlCalendar: string = 'https://www.googleapis.com/calendar/v3/calendars/' + this.email_1 + '/events?orderBy=starttime&singleEvents=true&maxResults=10&timeMin=' + this.timeMin + '&key=' + this.apiKeyCal;

  urlWeatherCurrent: string = 'http://api.wunderground.com/api/' + this.apiKeyW + '/conditions/q/' + this.state + '/' + this.city + '.json';

  urlHourlyCurrent: string = 'http://api.wunderground.com/api/' + this.apiKeyW + '/hourly/q/' + this.state + '/' + this.city + '.json';

  urlForecast: string = 'http://api.wunderground.com/api/' + this.apiKeyW + '/forecast/q/' + this.state + '/' + this.city + '.json';;

  constructor(private nav: NavController,
              private http: Http,
              public events: Events) {
    // Calls the Google Calendar API
    StatusBar.hide();
    this.getData();
    //this.getWeather();
    //this.getHourly();
    //this.getForecast();
    this.getClock();
  }

  tapSandbox(event, item) {
    this.nav.push(SandboxPage, {
      item: item
    });
  }

  logError(err) {
    console.error("There was an error: " + err);
  }

  // Gets the Calendar Data
  getData() {
    this.http.get(this.urlCalendar)
      .map(res => res.json())
      .subscribe(
        data => {
          this.recievedData = data;
          this.processRecievedData(data);
        },
        err => this.logError(err),
        () => console.log('Calendar data complete')
      );
  }

  private processRecievedData(data) {
    let model: calendarModel = new calendarModel();
    model.initialize(this.recievedData);
    this.calendarItems.push(model);
    console.log(this.calendarItems);
  }

  // This is the current forcast
  getWeather() {
    this.http.get(this.urlWeatherCurrent)
      .map(res => res.json())
      .subscribe(
        data => {
          this.recievedWeather = data;
          this.processWeatherData(data);
        },
        err => this.logError(err),
        () => console.log('Current weather data recieved')
      );
  }

  private processWeatherData(data) {
    let model: weatherModel = new weatherModel();
    model.initialize(this.recievedWeather);
    this.currentWeather.push(model);
    console.log(this.currentWeather);
  }

  // Get the current hourly forecast
  getHourly() {
    this.http.get(this.urlHourlyCurrent)
      .map(res => res.json())
      .subscribe(
        data => {
          this.recievedHourly = data;
          this.processHourlyData(data);
        },
        err => this.logError(err),
        () => console.log('Hourly weather recieved')
      );
  }

  private processHourlyData(data) {
    let model: hourlyModel = new hourlyModel();
    model.initialize(this.recievedHourly);
    this.hourlyWeather.push(model);
    console.log(this.hourlyWeather);
  }

  // Gets a forecast
  getForecast() {
    this.http.get(this.urlForecast)
      .map(res => res.json())
      .subscribe(
        data => {
          this.recievedForecast = data;
          this.processForecast(data);
        },
        err => this.logError(err),
        () => console.log('Weather forecast recieved')
      );
  }

  private processForecast(data) {
    let model: forecastModel = new forecastModel();
    model.initialize(this.recievedForecast);
    this.forecast.push(model);
    console.log(this.forecast);
  }





  // Create the clock
  getClock() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    if (h > 12) { h = h - 12; }
    if (m < 10) { m = 0 + m; }
    if (s < 10) { s = 0 + m; }

    console.log(h + ":" + m + ":" + s);

  }


}


/* Reference to offline cache
getData() {
  this.http.get(this.urlCalendar).subscribe( //Send a pull request to the remote server and map the response to res
    recievedData => { //convert the response to a json object, and map this object to recieved data
      this.recievedData = recievedData;
      this.processRecievedData();
      //this.sqlStorageService.storeData('coolerFallback', recievedData); //set the fallback cache to contain this data we just pulled
    },
    (err) => { //if the remote pull fails for any reason
      console.log('Error encountered fetching data from remote: \n' + err);
      //console.log('Using fallback cache...');
      //this.offlineFallback();
    }
  );

}
*/



/* Reference to the offline cache
getWeather() {
  this.http.get(this.urlWeatherCurrent).subscribe(
    recievedWeather => { //convert the response to a json object, and map this object to recieved data
      console.log(recievedWeather);
      this.recievedWeather = recievedWeather;
      //this.processRecievedData();
      //this.sqlStorageService.storeData('coolerFallback', recievedData); //set the fallback cache to contain this data we just pulled
    },
    (err) => { //if the remote pull fails for any reason
      console.log('Error encountered fetching data from remote: \n' + err);
      //console.log('Using fallback cache...');
      //this.offlineFallback();
    }
  );
}
*/
