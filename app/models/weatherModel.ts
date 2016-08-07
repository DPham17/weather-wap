import {Injectable} from '@angular/core';

@Injectable()
export class weatherModel{

    weather: {
      id: string
      main: string
      description: string
      icon: string
    }

    main: {
      temp: string
      pressure: string
      humidity: string
      temp_min: string
      temp_max: string
    }

    wind: {
      speed: string
      deg: string
    }

    clouds: {
      all: string
    }

    rain: {
      //3h: string
    }

    name: string

    initialize(data){
        for(var property in data){
            this[property] = data[property];
        }
    }

}


/*  Example output

{"coord":
{"lon":145.77,"lat":-16.92},
"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
"base":"cmc stations",
"main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
"wind":{"speed":5.1,"deg":150},
"clouds":{"all":75},
"rain":{"3h":3},
"dt":1435658272,
"sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
"id":2172797,
"name":"Cairns",
"cod":200}


*/
