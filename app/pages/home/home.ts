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
  email_1: string = 'dzutpham@gmail.com';
  apiKey: string = 'AIzaSyBu3Igz5qg8o8w56kcRNlpc-EA4xNvyVKY';
  timeMin: string = '2016-08-04T19:36:34+00:00';
  maxEvents: string = '10';

  items: Array<calendarModel> = new Array<calendarModel>();

  // Gotta build this url string
  urlCalendar: string = 'https://www.googleapis.com/calendar/v3/calendars/' + this.email_1 + '/events?maxResults=' + this.maxEvents + '&timeMin=' + this.timeMin + '&key=' + this.apiKey;


  constructor(private nav: NavController, private http: Http, public events: Events) {
    console.log(this.urlCalendar);
    this.getData();
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
    console.log(this.recievedData);
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


}
