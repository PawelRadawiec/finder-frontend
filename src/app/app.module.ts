import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ArticleState } from './store/article.state';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { TagChipsComponent } from './components/tag-chips/tag-chips.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TextFieldModule } from '@angular/cdk/text-field';
import { errorInterceptorProviders } from './intercepter/errors.interceptor';
import { ErrorState } from './store/error/error.state';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { MatTableModule } from '@angular/material/table';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { SettingsState } from './store/settings/settings.state';
import { ShortTextPipe } from './pipes/short-text.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { UserState } from './store/user/user.state';
import { authInterceptorProviders } from './intercepter/authorization.interceptor';

const materialModules = [
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatInputModule,
  MatChipsModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,

  MatAutocompleteModule
];

const ngxsModules = [
  NgxsModule.forRoot([
    UserState,
    ErrorState,
    ArticleState,
    SettingsState
  ]),
  NgxsRouterPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleComponent,
    ArticleListComponent,
    PageNotFoundComponent,
    ArticleFormComponent,
    TagChipsComponent,
    ArticleDetailsComponent,
    CommentFormComponent,
    FooterComponent,
    RegistrationFormComponent,
    // pipes
    ShortTextPipe
  ],
  imports: [
    ngxsModules,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TextFieldModule,
    materialModules
  ],
  providers: [errorInterceptorProviders, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
