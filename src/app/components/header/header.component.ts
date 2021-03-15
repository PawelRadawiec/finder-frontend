import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { SettingsState } from 'src/app/store/settings/settings.state';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  logged: boolean;
  deviceXs: boolean;
  private subscription = new Subscription();

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription.add(this.store.select(SettingsState.xsDevice).subscribe(xsDevice =>
      this.deviceXs = xsDevice
    ));
    this.subscription.add(this.store.select(UserState.logged).subscribe(logged =>
      this.logged = logged
    ))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
