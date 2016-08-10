import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Events} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {SandboxPage} from '../sandbox/sandbox'
import {calendarModel} from '../../models/calendarModel'
import {weatherModel} from '../../models/weatherModel'

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

  recievedData: any;
  recievedWeather: any;
  email_1: string = 'dzutpham@gmail.com';
  apiKeyCal: string = 'AIzaSyAT85ggW19Y2_4i2bGPZ_O2hBTcN94wBHY';
  apiKeyW: string = '61e9b5e1f5096d77dbd8dc5faf674e43';
  timeMin: string = '2016-08-04T19%3A36%3A34%2B00%3A00';
  //timeMin: string = '2016-08-04T19:36:34+00:00';
  maxEvents: string = '10';
  city: string = 'Bentonville,US'

  calendarItems: Array<calendarModel> = new Array<calendarModel>();
  currentWeather: Array<weatherModel> = new Array<weatherModel>();

  // Gotta build url string
  urlCalendar: string = 'https://www.googleapis.com/calendar/v3/calendars/' + this.email_1 + '/events?maxResults=10&timeMin=' + this.timeMin + '&key=' + this.apiKeyCal;

  urlWeatherCurrent: string = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&units=imperial&appid=' + this.apiKeyW;

  urlForecast: string = 'http://api.openweathermap.org/data/2.5/forecast?q=' + this.city + '&units=imperial&appid=' + this.apiKeyW;

  constructor(private nav: NavController, private http: Http, public events: Events) {
    // Calls the Google Calendar API
    this.getData();
    this.getWeather();
    //this.getForecast();
  }

  tapSandbox(event, item) {
    this.nav.push(SandboxPage, {
      item: item
    });
  }

  logError(err) {
    console.error("There was an error: " + err);
  }

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

  /*
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
  */

  /*
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

  private processRecievedData(data) {
    console.log(data); // This is only to show the layout of the data
    let model: calendarModel = new calendarModel();
    model.initialize(this.recievedData);
    this.calendarItems.push(model);
    console.log(this.calendarItems);
  }

/*private processRecievedData() {
  for (var item of this.recievedData) {
    let model: calendarModel = new calendarModel()
    model.initialize(item);
    this.items.push(model);
    //this.events.publish('calendar:updated');
  }
  //this.events.publish('calendar:datapullFinished');
}*/

/*
private processRecievedData() {
    for (var item of this.recievedData) {
      let model: coolerSlotModel = new coolerSlotModel()
      model.initialize(item);
      model.inspectionTranslate();
      this.items.push(model);
      this.events.publish('coolerList:updated');
    }
    this.events.publish('coolerList:datapullFinished');
  }
*/




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
    console.log(data); // This is only to show the layout of the data
    let model: weatherModel = new weatherModel();
    model.initialize(this.recievedWeather);
    this.currentWeather.push(model);
    console.log(this.currentWeather);
  }

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


}
