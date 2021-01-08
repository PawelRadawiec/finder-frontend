import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SystemStateMatcher } from '../matcher/system-error-state.matcher';
import { ErrorState } from '../store/error/error.state';

@Injectable()
export class ErrorStateMatcherHelperService implements OnDestroy {

  private subscription: Subscription;
  private matchers: Map<string, SystemStateMatcher>;

  constructor(private store: Store) {
    this.matchers = new Map<string, SystemStateMatcher>();
    this.subscription = store.select(ErrorState.errors).subscribe(
      errors => this.handleErrorsSubscribe(errors)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleErrorsSubscribe(errors: Map<string, string>) {
    this.matchers = new Map<string, SystemStateMatcher>();
    errors?.forEach((value, key) => {
      const matcher = new SystemStateMatcher();
      matcher.setField(key);
      matcher.setErrors(errors);
      this.matchers.set(key, matcher);
    })
  }

  getMatcher(field: string) {
    return this.matchers?.get(field);
  }

  getMatchers() {
    return this.matchers;
  }

}
