import {Injectable} from '@angular/core';

@Injectable()
export class forecastModel{

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


/*  Example output (repeated)

{"city":{"id":1851632,"name":"Shuzenji",
"coord":{"lon":138.933334,"lat":34.966671},
"country":"JP",
"cod":"200",
"message":0.0045,
"cnt":38,
"list":[{
        "dt":1406106000,
        "main":{
            "temp":298.77,
            "temp_min":298.77,
            "temp_max":298.774,
            "pressure":1005.93,
            "sea_level":1018.18,
            "grnd_level":1005.93,
            "humidity":87
            "temp_kf":0.26},
        "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
        "clouds":{"all":88},
        "wind":{"speed":5.71,"deg":229.501},
        "sys":{"pod":"d"},
        "dt_txt":"2014-07-23 09:00:00"}
        ]}


*/
