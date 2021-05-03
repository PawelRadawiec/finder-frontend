import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RegistrationResponseModel } from 'src/app/models/registration-response.model';
import { User } from 'src/app/models/user.model';
import { ErrorStateMatcherHelperService } from 'src/app/service/error-state-matcher-helper.service';
import { UserActions } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [ErrorStateMatcherHelperService]
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  @Select(UserState.registerLoading) registerLoading$: Observable<boolean>;
  registrationResponseModel: RegistrationResponseModel;
  registrationForm: FormGroup;
  private subscription = new Subscription();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorHelper: ErrorStateMatcherHelperService
  ) { }

  ngOnInit() {
    this.setForm();
    this.subscription.add(
      this.store.select(UserState.registrationResponseModel).subscribe(registrationResponseModel => this.registrationResponseModel = registrationResponseModel)
    );
  }

  onSubmit() {
    this.store.dispatch(new UserActions.RegistrationRequest(new User(this.registrationForm.value)))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new UserActions.SetCreated(null));
  }

  private setForm() {
    this.registrationForm = this.formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

}


