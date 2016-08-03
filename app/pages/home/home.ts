import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SandboxPage} from '../sandbox/sandbox'

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  constructor(private nav: NavController) {
  }

  tapSandbox(event, item) {
    this.nav.push(SandboxPage, {
      item: item
    });
  }
}
