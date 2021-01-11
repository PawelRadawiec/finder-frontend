import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Store } from '@ngxs/store';
import { ArticleState } from 'src/app/store/article.state';


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
  columnsToDisplay = ['author', 'shortText'];
  expandedElement: Comment | null;
  article: Article;

  private subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(ArticleState.article).subscribe(
      article => this.article = article
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
