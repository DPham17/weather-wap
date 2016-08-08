import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Events} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {SandboxPage} from '../sandbox/sandbox'
import {calendarModel} from '../../models/calendarModel'

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
  city: string = 'bentonville,ar'

  items: Array<calendarModel> = new Array<calendarModel>();

  // Gotta build url string
  urlCalendar: string = 'https://www.googleapis.com/calendar/v3/calendars/' + this.email_1 + '/events?maxResults=10&timeMin=' + this.timeMin + '&key=' + this.apiKeyCal;

  //https://www.googleapis.com/calendar/v3/calendars/dzutpham@gmail.com/events?maxResults=10&timeMin=2016-08-04T00:12:43+00:00&key=AIzaSyD6u2G4mYR2EmEcBc5R2L0ciVYbr20L0eg

  urlWeatherCurrent: string = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&units=imperial&appid=' + this.apiKeyW;

  constructor(private nav: NavController, private http: Http, public events: Events) {
    console.log(this.urlCalendar);
    // Calls the Google Calendar API
    this.getData();
    this.getWeather();
  }

  tapSandbox(event, item) {
    this.nav.push(SandboxPage, {
      item: item
    });
  }

  getData() {
    this.http.get(this.urlCalendar).subscribe( //Send a pull request to the remote server and map the response to res
      recievedData => { //convert the response to a json object, and map this object to recieved data
        console.log(recievedData);
        this.recievedData = recievedData;
        //this.processRecievedData();
        //this.sqlStorageService.storeData('coolerFallback', recievedData); //set the fallback cache to contain this data we just pulled
      },
      (err) => { //if the remote pull fails for any reason
        console.log('Error encountered fetching data from remote: \n' + err);
        //console.log('Using fallback cache...');
        //this.offlineFallback();
      }
    );
    console.log("Calendar output " + this.recievedData);
  }

  private processRecievedData() {
    for (var item of this.recievedData) {
      let model: calendarModel = new calendarModel()
      model.initialize(item);
      this.items.push(model);
      this.events.publish('calendar:updated');
    }
    this.events.publish('calendar:datapullFinished');
  }

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
    console.log(this.recievedWeather);
  }



}
