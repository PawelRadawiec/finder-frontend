export class Article {
    id: string;
    url: string;
    title: string;
    author: string;
    pictureUrl: string;
    description: string;
    tags: string[];
    comments: Comment[];

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
