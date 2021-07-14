import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from 'src/app/modules/article/components/article/article.component';
import { ArticleDetailsComponent } from 'src/app/modules/article/components/article-details/article-details.component';
import { ArticleFormComponent } from 'src/app/modules/article/components/article-form/article-form.component';
import { ArticleListComponent } from 'src/app/modules/article/components/article-list/article-list.component';
import { CommentFormComponent } from 'src/app/modules/article/components/comment-form/comment-form.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArticleResolver } from 'src/app/resolvers/article.resolver';
import { ArticlesResolver } from 'src/app/resolvers/articles.resolver';


const routes: Routes = [
  {
    path: 'articles',
    component: ArticleListComponent,
    resolve: [ArticlesResolver]
  },
  {
    path: 'article-form',
    component: ArticleFormComponent
  },
  {
    path: 'details/:id',
    component: ArticleDetailsComponent,
    resolve: [ArticleResolver]
  },
]

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleDetailsComponent,
    ArticleFormComponent,
    ArticleListComponent,
    CommentFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
