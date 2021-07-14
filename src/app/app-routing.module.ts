import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './modules/article/components/article-list/article-list.component';
import { ActivateResolver } from './resolvers/activate.resolver';
import { ArticleResolver } from './resolvers/article.resolver';
import { ArticlesResolver } from './resolvers/articles.resolver';

const routes: Routes = [

  {
    path: 'user',
    loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'article',
    loadChildren: () => import('src/app/modules/article/article.module').then(m => m.ArticleModule)
  },
  {
    path: '**',
    component: ArticleListComponent,
    resolve: [ArticlesResolver]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ArticlesResolver, ArticleResolver, ActivateResolver]
})
export class AppRoutingModule { }
