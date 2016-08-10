import {Injectable} from '@angular/core';

@Injectable()
export class calendarModel{

  kind: string
  summary: string
  description: string
  updated: string
  timeZone: string
  accessRole: string

  items: {
    kind: string
    status: string
    updated: string
    summary: string

    creator: {
      email: string
      displayName: string
    }

    start: {
      date: string
    }

    end: {
      date: string
    }

  }


  initialize(data){
    for(var property in data){
      this[property] = data[property];
    }
  }

}


/*  Example output

{
 "kind": "calendar#events",
 "etag": "\"p33kfdsnnhikcs0g\"",
 "summary": "dzutpham@gmail.com",
 "updated": "2016-08-04T15:43:16.913Z",
 "timeZone": "America/Chicago",
 "accessRole": "owner",
 "defaultReminders": [
  {
   "method": "popup",
   "minutes": 30
  }
 ],
 "nextSyncToken": "COj28veMqM4CEOj28veMqM4CGAU=",
 "items": [
  {

   "kind": "calendar#event",
   "etag": "\"2940650649392000\"",
   "id": "74p3ip1ic4r3eb9g6di36b9k70rm8b9p6gpj2bb270om4phgc8q66pj274",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=NzRwM2lwMWljNHIzZWI5ZzZkaTM2YjlrNzBybThiOXA2Z3BqMmJiMjcwb200cGhnYzhxNjZwajI3NCBkenV0cGhhbUBt",
   "created": "2016-08-04T15:42:04.000Z",
   "updated": "2016-08-04T15:42:04.696Z",
   "summary": "Work on wap all day",
   "creator": {
    "email": "dzutpham@gmail.com",
    "displayName": "Dzu Pham",
    "self": true
   },
   "organizer": {
    "email": "dzutpham@gmail.com",
    "displayName": "Dzu Pham",
    "self": true
   },
   "start": {
    "date": "2016-08-04"
   },
   "end": {
    "date": "2016-08-05"
   },
   "transparency": "transparent",
   "iCalUID": "74p3ip1ic4r3eb9g6di36b9k70rm8b9p6gpj2bb270om4phgc8q66pj274@google.com",
   "sequence": 0,
   "reminders": {
    "useDefault": false
   }
  },
  {

   "kind": "calendar#event",
   "etag": "\"2940650793449000\"",
   "id": "coqm6d9jcopmcb9l6kr3eb9kcgsj4b9pcko3gb9k68rm4e9nccrm8p316k",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=Y29xbTZkOWpjb3BtY2I5bDZrcjNlYjlrY2dzajRiOXBja28zZ2I5azY4cm00ZTluY2NybThwMzE2ayBkenV0cGhhbUBt",
   "created": "2016-08-04T15:43:16.000Z",
   "updated": "2016-08-04T15:43:16.766Z",
   "summary": "Event call 1",
   "colorId": "10",
   "creator": {
    "email": "dzutpham@gmail.com",
    "displayName": "Dzu Pham",
    "self": true
   },
   "organizer": {
    "email": "dzutpham@gmail.com",
    "displayName": "Dzu Pham",
    "self": true
   },
   "start": {
    "dateTime": "2016-08-04T15:00:00-05:00",
    "timeZone": "America/Chicago"
   },
   "end": {
    "dateTime": "2016-08-04T16:00:00-05:00",
    "timeZone": "America/Chicago"
   },
   "iCalUID": "coqm6d9jcopmcb9l6kr3eb9kcgsj4b9pcko3gb9k68rm4e9nccrm8p316k@google.com",
   "sequence": 0,
   "reminders": {
    "useDefault": false
   }
  }
 ]
}


*/
