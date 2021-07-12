import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MessageResponse } from 'src/app/models/message-response.model';
import { UserSelectors } from 'src/app/store/user/user.selectors';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit, OnDestroy {
  message: MessageResponse;
  private subscription = new Subscription();

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription.add(
        this.store.select(UserSelectors.activateMessage).subscribe(message => this.message = message)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
