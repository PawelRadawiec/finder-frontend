import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SettingsState } from 'src/app/store/settings/settings.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  deviceXs: boolean;
  private subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(SettingsState.xsDevice).subscribe(xsDevice =>
      this.deviceXs = xsDevice
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
