import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user.model';
import { ErrorStateMatcherHelperService } from 'src/app/service/error-state-matcher-helper.service';
import { UserActions } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [ErrorStateMatcherHelperService]
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorHelper: ErrorStateMatcherHelperService
  ) { }

  ngOnInit() {
    this.setRegistrationForm();
  }

  onSubmit() {
    this.store.dispatch(new UserActions.RegistrationRequest(new User(this.registrationForm.value)))
  }

  private setRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    })
  }

}


