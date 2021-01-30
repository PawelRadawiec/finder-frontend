import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SettingActions } from './store/settings/settings.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private store: Store,
    public mediaObserver: MediaObserver
  ) {

  }

  ngOnInit() {
    this.subscription = this.mediaObserver.asObservable().subscribe(
      (results: MediaChange[]) =>
        this.store.dispatch(new SettingActions.SetXsDevice(![null, undefined].includes(results.find(result => result.mqAlias === 'xs'))))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
