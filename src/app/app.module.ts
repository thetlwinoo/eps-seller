import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import './vendor.ts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { rootConfig } from 'app/root-config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { RootSharedModule } from '@epm/shared.module';
import { RootModule } from '@epm/root.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '@epm/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '@epm/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@epm/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '@epm/blocks/interceptor/notification.interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { TranslateModule } from '@ngx-translate/core';
import { ROOT_REDUCERS, metaReducers } from 'app/ngrx';
import { NgrxCoreModule } from 'app/ngrx/core';
import { RouterEffects } from 'app/ngrx/core/effects';

import { RootProgressBarModule } from '@epm/components/progress-bar/progress-bar.module';
import { LayoutModule } from 'app/layout/layout.module';
import { NgrxAuthModule } from 'app/ngrx/auth';
import { NgrxProductsModule } from 'app/ngrx/products';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: false
    }),
    RootModule.forRoot(rootConfig),
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true,
      //   strictStateSerializability: true,
      //   strictActionSerializability: true,
      // },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx E Commerce App',
      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }),
    EffectsModule.forRoot([RouterEffects]),
    NgrxCoreModule,
    RootSharedModule,
    RootProgressBarModule,
    NgrxAuthModule,
    NgrxProductsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
