import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleState } from 'src/app/store/article.state';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articles: Article[] = [];
  private subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.subscription = this.store.select(ArticleState.articles).subscribe(
      articles => this.articles = articles
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
