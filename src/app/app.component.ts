import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'finder-frontend';
  deviceXs: boolean;
  private subscription: Subscription;

  constructor(public mediaObserver: MediaObserver) {

  }

  ngOnInit() {
    this.subscription = this.mediaObserver.asObservable().subscribe(
      (results: MediaChange[]) =>
        this.deviceXs = ![null, undefined].includes(results.find(result => result.mqAlias === 'xs'))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
