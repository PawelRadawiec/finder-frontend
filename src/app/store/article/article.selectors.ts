import { Selector } from "@ngxs/store";
import { ArticleStateModel } from "./article-state.model";
import { ArticleState } from "./article.state";

export class ArticleSelectors {

    @Selector([ArticleState])
    static article(state: ArticleStateModel) {
        return state.article;
    }

    @Selector([ArticleState])
    static articles(state: ArticleStateModel) {
        return state.articles;
    }

    @Selector([ArticleState])
    static registration(state: ArticleStateModel) {
        return state.registration;
    }

}