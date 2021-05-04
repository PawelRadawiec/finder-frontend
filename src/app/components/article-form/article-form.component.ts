import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SystemStateMatcher } from 'src/app/matcher/system-error-state.matcher';
import { ArticleRegistration, ArticleStep, TargetStep } from 'src/app/models/article-registration.model';
import { Article, ArticleStatus } from 'src/app/models/article.model';
import { ErrorStateMatcherHelperService } from 'src/app/service/error-state-matcher-helper.service';
import { ArticleActions } from 'src/app/store/article.actions';
import { ArticleState } from 'src/app/store/article.state';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  providers: [ErrorStateMatcherHelperService]
})
export class ArticleFormComponent implements OnInit {
  @ViewChild('stepper') stepper;

  articleForm: FormGroup;
  firstFormGroup: FormGroup;
  matcher = new SystemStateMatcher();
  targetStep = TargetStep;
  registration: ArticleRegistration;
  secondFormGroup: FormGroup;
  private subscription = new Subscription();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorHelper: ErrorStateMatcherHelperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setArticleForm();
    this.subscription.add(
      this.store.select(ArticleState.registration).subscribe(registration => this.handleRegistration(registration))
    )
  }

  stepAction(targetStep: TargetStep) {
    const article = new Article(this.articleForm.value);
    article.tags = this.articleForm.get('tags').value[0];
    const registration = new ArticleRegistration();
    registration.article = article;
    switch (this.stepper.selectedIndex) {
      case 0:
        registration.currentStep = ArticleStep.DATA;
        break;
      case 1:
        registration.currentStep = ArticleStep.SUMMARY;
        break;
      case 2:
        registration.currentStep = ArticleStep.DONE;
        break;
      default:
        registration.currentStep = ArticleStep.NO_STEP;
    }
    registration.targetStep = targetStep;
    this.store.dispatch(new ArticleActions.ArticleFormRequest(registration));
  }

  setArticleForm() {
    this.articleForm = this.formBuilder.group({
      url: [''],
      title: [''],
      author: [''],
      pictureUrl: [''],
      description: ['']
    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private handleRegistration(registration: ArticleRegistration) {
    if (!registration) {
      this.registration = new ArticleRegistration();
      this.registration.currentStep = ArticleStep.DATA;
      return;
    }
    this.registration = _.cloneDeep(registration);
    // this.setComplate();
    switch (this.registration.currentStep) {
      case ArticleStep.DATA:
        this.stepper.selectedIndex = 0;
        break;
      case ArticleStep.SUMMARY:
        this.stepper.selectedIndex = 1;
        break;
      case ArticleStep.DONE:
        this.handleDoneStatus();
        break;
      default:
        this.stepper.selectedIndex = 0;
    }
  }

  private handleDoneStatus() {
    this.stepper.selectedIndex = 2;
    if (this.registration.article.status === ArticleStatus.SAVED) {
      this.router.navigate(['/articles']);
    }
  }

}
