import {Injectable} from '@angular/core';

@Injectable()
export class forecastModel{

  forecast: {
    simpleforecast: {
      forecastday: {
        avghumidity: string
        conditions: string

        high: {
          fahreheit: string
        }

        low: {
          fahreheit: string
        }

        date: {
          weekday: string
          monthname: string
          monthname_short: string
          day: string
          year: string
          pretty: string

        }

      }
    }
  }

  initialize(data){
    for(var property in data){
      this[property] = data[property];
    }
  }

}
