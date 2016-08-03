import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';


@Component({
  templateUrl: 'build/pages/sandbox/sandbox.html'
})

export class SandboxPage {
  constructor(private nav: NavController, navParams: NavParams) {
  }

  tapHomepage(event, item) {
    this.nav.setRoot(HomePage);
  }
}
