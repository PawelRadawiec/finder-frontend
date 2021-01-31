import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Comment } from 'src/app/models/comment.model';
import { ErrorStateMatcherHelperService } from 'src/app/service/error-state-matcher-helper.service';
import { ArticleActions } from 'src/app/store/article.actions';
import { ArticleState } from 'src/app/store/article.state';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  providers: [ErrorStateMatcherHelperService]
})
export class CommentFormComponent implements OnInit, OnDestroy {
  article: Article;
  commentForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorHelper: ErrorStateMatcherHelperService
  ) { }

  ngOnInit() {
    this.subscription = this.store.select(ArticleState.article).subscribe(
      article => this.handleArticleSubscribe(article)
    );
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleArticleSubscribe(article: Article) {
    this.article = article;
    this.commentForm?.reset();
  }

  onSubmit() {
    const comment = new Comment();
    comment.text = this.commentForm.value?.comment;
    comment.author = 'mock';
    this.store.dispatch(new ArticleActions.AddComment(this.article.id, comment));
  }

}
