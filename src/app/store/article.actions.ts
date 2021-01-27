import { Article } from "../models/article.model";
import { Comment } from "../models/comment.model";

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

    export class GetByIdRequest {
        static readonly type = '[Article] GetByIdRequest';

        constructor(public id: string) { }

    }

    export class GetByIdResponse {
        static readonly type = '[Article] GetByIdResponse';

        constructor(public response: Article) { }

    }

    export class SetArticle {
        static readonly type = '[Article] SetArticle';

        constructor(public article: Article) { }
    }

    export class AddComment {
        static readonly type = '[Article] AddComment';

        constructor(
            public articleId: string,
            public comment: Comment
        ) { }
    }

    export class EvaluateCommentRequest {
        static readonly type = '[Article] EvaluateCommentRequest';
        constructor(
            public articleId: string,
            public commentId: number,
            public ratting: any
        ) { }
    }

    export class EvaluateCommentResponse {
        static readonly type = '[Article]EvaluateCommentResponse';
        constructor(public response: Article) { }
    }

}