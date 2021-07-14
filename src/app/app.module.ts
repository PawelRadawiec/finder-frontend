import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { errorInterceptorProviders } from './intercepter/errors.interceptor';
import { ErrorState } from './store/error/error.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { SettingsState } from './store/settings/settings.state';
import { ShortTextPipe } from './pipes/short-text.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { UserState } from './store/user/user.state';
import { authInterceptorProviders } from './intercepter/authorization.interceptor';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { ArticleState } from './store/article/article.state';
import { SharedModule } from './modules/shared/shared.module';

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
    PageNotFoundComponent,
    // TagChipsComponent,
    FooterComponent,
    // pipes
    ShortTextPipe,
    NotificationComponent
  ],
  imports: [
    ngxsModules,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TextFieldModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    errorInterceptorProviders,
    authInterceptorProviders,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
