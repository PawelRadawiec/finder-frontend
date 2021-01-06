import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Article } from 'src/app/models/article.model';
import { ArticleActions } from 'src/app/store/article.actions';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  articleForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
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
