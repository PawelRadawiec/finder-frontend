import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ArticleResolver } from './resolvers/article.resolver';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticleListComponent,
    resolve: [ArticleResolver]
  },
  {
    path: 'article-form',
    component: ArticleFormComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ArticleResolver]
})
export class AppRoutingModule { }
