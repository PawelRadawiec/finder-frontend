import { Article } from "./article.model";

export enum TargetStep {
    NEXT = 'NEXT',
    BACK = 'BACK',
    NO_TAGET = 'NO_TAGET'
}

export enum ArticleStep {
    DATA = 'DATA',
    SUMMARY = 'SUMMARY',
    DONE = 'DONE',
    NO_STEP = 'NO_STEP'
}

export class ArticleRegistration {
    article: Article;
    currentStep: ArticleStep;
    targetStep: TargetStep
}
