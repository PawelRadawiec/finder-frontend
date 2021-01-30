import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Store } from '@ngxs/store';
import { ArticleState } from 'src/app/store/article.state';
import { Comment } from 'src/app/models/comment.model';
import * as _ from 'lodash';
import { ArticleActions } from 'src/app/store/article.actions';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  columnsData = [
    {columnName: 'author', fieldName: 'author'}, 
    {columnName: 'comment', fieldName: 'shortText'}, 
    {columnName: 'likes', fieldName: 'likes'}, 
    {columnName: 'dislikes', fieldName: 'dislikes'},
  ];
  columnsNames = [];
  expandedElement: Comment | null;
  article: Article;

  private subscription: Subscription;
  private ratingValues: Map<string, boolean> = new Map<string, boolean>();

  constructor(private store: Store) { }

  ngOnInit() {
    this.ratingValues.set('LIKE', true);
    this.ratingValues.set('DISLIKE', false);
    this.columnsNames = this.columnsData.map(column => column.columnName);
    this.subscription = this.store.select(ArticleState.article).subscribe(
      article => this.handleArticleSubscribe(article)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleArticleSubscribe(article: Article) {
    this.article = _.cloneDeep(article);
    this.article.comments.forEach(comment => {
      comment.likes = comment?.ratings?.filter(rating => rating.value)?.length;
      comment.dislikes = comment?.ratings?.filter(rating => !rating.value)?.length;
    })
  }

  evaluate(type: string, commentId: number) {
    const ratting = {
      value: this.ratingValues.get(type),
      author: 'pawelr123'
    };
    this.store.dispatch(new ArticleActions.EvaluateCommentRequest(this.article.id, commentId, ratting))
  }

  displayLikeDislike(columnName: string) {
    return ['likes', 'dislikes'].includes(columnName);
  }

}
