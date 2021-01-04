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

}