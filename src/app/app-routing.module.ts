import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleResolver } from './resolvers/article.resolver';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticleListComponent,
    resolve: [ArticleResolver]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ArticleResolver]
})
export class AppRoutingModule { }
