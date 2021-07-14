import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SettngSelectors } from 'src/app/store/settings/settings.selector';
import { UserSelectors } from 'src/app/store/user/user.selectors';

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
    this.subscription.add(this.store.select(SettngSelectors.xsDevice).subscribe(xsDevice =>
      this.deviceXs = xsDevice
    ));
    this.subscription.add(this.store.select(UserSelectors.logged).subscribe(logged =>
      this.logged = logged
    ))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
