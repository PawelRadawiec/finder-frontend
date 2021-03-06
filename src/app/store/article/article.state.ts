import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { ArticleService } from "../../service/article.service";
import { mergeMap } from 'rxjs/operators';
import { ArticleActions } from "./article.actions";
import { ArticleStateModel } from "./article-state.model";


@State({
    name: 'article',
    defaults: {
        article: null,
        articles: [],
        registration: null
    }
})
@Injectable()
export class ArticleState {

    constructor(
        private store: Store,
        private articleService: ArticleService
    ) {
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
        return this.articleService.create(action.registration).pipe(
            mergeMap(registration => this.store.dispatch(new ArticleActions.SetRegistraton(registration)))
        );
    }

    @Action(ArticleActions.SetRegistraton)
    setRegistration(state: StateContext<ArticleStateModel>, action: ArticleActions.SetRegistraton) {
        state.patchState({
            registration: action.registration
        });
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

    @Action(ArticleActions.EvaluateCommentRequest)
    evaluateComment(state: StateContext<ArticleStateModel>, action: ArticleActions.EvaluateCommentRequest) {
        return this.articleService.evaluate(action.articleId, action.commentId, action.ratting).pipe(
            mergeMap(response => this.store.dispatch(new ArticleActions.SetArticle(response)))
        );
    }

}