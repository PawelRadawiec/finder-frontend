import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor() { }

  ngOnInit() {
    const article = new Article();
    article.author = 'Paweł Radawiec';
    article.description = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from JapanA small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';
    article.tags = ['#city', '#car'];
    article.title = 'Article about cars in city';
    article.url = 'wp.pl';
    this.articles.push(article);
    
    const article2 = new Article();
    article2.author = 'John Snow';
    article2.description = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from JapanA small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';
    article2.tags = ['#winter', '#walls'];
    article2.title = 'Article about winter';
    article2.url = 'winteriscomming.com';
    this.articles.push(article2);
  }

}
