import { Comment } from "./comment.model";

export enum ArticleStatus {
    SAVED = 'SAVED',
    CREATION = 'CREATION'
}

export class Article {
    id: string;
    url: string;
    title: string;
    author: string;
    pictureUrl: string;
    description: string;
    tags: string[];
    comments: Comment[];
    status: ArticleStatus;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
