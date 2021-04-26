import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './components/activate/activate.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ActivateResolver } from './resolvers/activate.resolver';
import { ArticleResolver } from './resolvers/article.resolver';
import { ArticlesResolver } from './resolvers/articles.resolver';

const routes: Routes = [
  {
    path: '', redirectTo: '/articles', pathMatch: 'full'
  },
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
  {
    path: 'registration',
    component: RegistrationFormComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'activation/:id',
    component: ActivateComponent,
    resolve: [ActivateResolver]
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
