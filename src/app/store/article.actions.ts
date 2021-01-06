import { Article } from "../models/article.model";

export namespace ArticleActions {

    export class SearchArticlesRequest {
        static readonly type = '[Article] SearchArticlesRequest';

        constructor() { }
    }

    export class SearchArticlesResponse {
        static readonly type = '[Article] SearchArticlesResponse';

        constructor(public response: Article[]) { }
    }

    export class ArticleFormRequest {
        static readonly type = '[Article] ArticleFormRequest';

        constructor(public article: Article) { }
    }

    export class SetArticle {
        static readonly type = '[Article] SetArticle';

        constructor(public article: Article) { }
    }

}