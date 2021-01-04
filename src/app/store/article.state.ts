import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Article } from "../models/article.model";
import { ArticleService } from "../service/article.service";
import { ArticleActions } from "./article.actions";
import { mergeMap } from 'rxjs/operators';

export interface ArticleStateModel {
    articles: Article[];
}

@State({
    name: 'article',
    defaults: {
        articles: []
    }
})
@Injectable()
export class ArticleState {

    constructor(
        private store: Store,
        private articleService: ArticleService
    ) {
    }

    @Selector()
    static articles(state: ArticleStateModel) {
        return state.articles;
    }

    @Action(ArticleActions.SearchArticlesRequest)
    searchRequest(state: StateContext<ArticleStateModel>, action: ArticleActions.SearchArticlesRequest) {
        return this.articleService.search().pipe(
            mergeMap(response => this.store.dispatch(new ArticleActions.SearchArticlesResponse(response)))
        )
    }

    @Action(ArticleActions.SearchArticlesResponse)
    searchResponse(state: StateContext<ArticleStateModel>, action: ArticleActions.SearchArticlesResponse) {
        state.patchState({
            articles: action.response
        });
    }

}