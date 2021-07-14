import { Component, Input, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() showCommentsButton = true;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  details() {
    this.store.dispatch(new Navigate([`/details/${this.article.id}`]))
  }

}
