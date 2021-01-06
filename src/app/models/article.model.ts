export class Article {
    id: string;
    url: string;
    title: string;
    author: string;
    pictureUrl: string;
    description: string;
    tags: string[];

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
