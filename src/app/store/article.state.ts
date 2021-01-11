import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Article } from "../models/article.model";
import { ArticleService } from "../service/article.service";
import { ArticleActions } from "./article.actions";
import { mergeMap } from 'rxjs/operators';
import { Navigate } from "@ngxs/router-plugin";

export interface ArticleStateModel {
    article: Article;
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
    static article(state: ArticleStateModel) {
        return state.article;
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

    @Action(ArticleActions.ArticleFormRequest)
    createRequest(state: StateContext<ArticleStateModel>, action: ArticleActions.ArticleFormRequest) {
        return this.articleService.create(action.article).pipe(
            mergeMap(article => this.store.dispatch(new ArticleActions.SetArticle(article)))
        );
    }

    @Action(ArticleActions.GetByIdRequest)
    getByIdRequest(state: StateContext<ArticleStateModel>, action: ArticleActions.GetByIdRequest) {
        return this.articleService.getById(action.id).pipe(
            mergeMap(article => this.store.dispatch(new ArticleActions.GetByIdResponse(article)))
        );
    }

    @Action(ArticleActions.GetByIdResponse)
    getByIdResponse(state: StateContext<ArticleStateModel>, action: ArticleActions.GetByIdResponse) {
        const article = action.response;
        state.patchState({
            article
        });
    }

    @Action(ArticleActions.AddComment)
    addComment(state: StateContext<ArticleStateModel>, action: ArticleActions.AddComment) {
        return this.articleService.addComnnet(action.articleId, action.comment).pipe(
            mergeMap(article => this.store.dispatch(new ArticleActions.SetArticle(article)))
        );
    }

    @Action(ArticleActions.SetArticle)
    setArticle(state: StateContext<ArticleStateModel>, action: ArticleActions.SetArticle) {
        state.patchState({
            article: action.article
        });
    }

}