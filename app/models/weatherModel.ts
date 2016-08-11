import {Injectable} from '@angular/core';

@Injectable()
export class weatherModel{

  dewpoint_f: string
  heatindex_f: string
  feelslike_f: string

  display_location: {
    city: string
    state: string
    state_name: string
    full: string
  }

  temp_f: string
  tempature_string: string
  weather: string
  windchill_f: string

  initialize(data){
    for(var property in data){
      this[property] = data[property];
    }
  }

}
