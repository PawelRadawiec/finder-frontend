import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:8080/article';

  constructor(private http: HttpClient) { }

  search() {
    return this.http.get<Article[]>(`${this.baseUrl}/search`);
  }

  create(article: Article) {
    return this.http.post<Article>(`${this.baseUrl}/create`, article);
  }

}
