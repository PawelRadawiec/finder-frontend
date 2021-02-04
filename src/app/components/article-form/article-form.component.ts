import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SystemStateMatcher } from 'src/app/matcher/system-error-state.matcher';
import { Article } from 'src/app/models/article.model';
import { ErrorStateMatcherHelperService } from 'src/app/service/error-state-matcher-helper.service';
import { ArticleActions } from 'src/app/store/article.actions';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  providers: [ErrorStateMatcherHelperService]
})
export class ArticleFormComponent implements OnInit {
  matcher = new SystemStateMatcher();
  articleForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorHelper: ErrorStateMatcherHelperService
  ) { }

  ngOnInit() {
    this.setArticleForm();
  }

  onSubmit() {
    const article = new Article(this.articleForm.value);
    article.tags = this.articleForm.get('tags').value[0];
    this.store.dispatch(new ArticleActions.ArticleFormRequest(article));
  }

  setArticleForm() {
    this.articleForm = this.formBuilder.group({
      url: [''],
      title: [''],
      author: [''],
      pictureUrl: [''],
      description: ['']
    })
  }

}
