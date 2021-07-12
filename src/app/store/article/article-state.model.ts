import { ArticleRegistration } from "src/app/models/article-registration.model";
import { Article } from "src/app/models/article.model";

export interface ArticleStateModel {
    article: Article;
    articles: Article[];
    registration: ArticleRegistration;
}