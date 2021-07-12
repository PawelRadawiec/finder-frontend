import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Article } from "../models/article.model";
import { ArticleActions } from "../store/article/article.actions";
import { ArticleState } from "../store/article/article.state";

@Injectable()
export class ArticlesResolver implements Resolve<any> {

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Article[]> {
        return this.store.dispatch(new ArticleActions.SearchArticlesRequest).pipe(
            map(() => this.store.selectSnapshot(ArticleState))
        );
    }

}