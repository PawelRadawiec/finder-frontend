import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:8080/article';
  private commentUrl = 'http://localhost:8080/comment';

  constructor(private http: HttpClient) { }

  search() {
    return this.http.get<Article[]>(`${this.baseUrl}/search`);
  }

  create(article: Article) {
    return this.http.post<Article>(`${this.baseUrl}/create`, article);
  }

  getById(id: string) {
    return this.http.get<Article>(`${this.baseUrl}/${id}`);
  }

  addComnnet(articleId: string, comment: Comment) {
    return this.http.post<Article>(`${this.commentUrl}/${articleId}`, comment);
  }

}
