import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { rootConfig } from 'app/root-config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { RootSharedModule } from '@eps/shared.module';
import { RootModule } from '@eps/root.module';

import { ROOT_REDUCERS, metaReducers } from 'app/ngrx';
import { NgrxCoreModule } from 'app/ngrx/core';
import { RouterEffects } from 'app/ngrx/core/effects';

import { CoreModule } from '@eps/core/core.module';

import { RootProgressBarModule } from '@eps/components/progress-bar/progress-bar.module';
import { LayoutModule } from 'app/layout/layout.module';
import { NgrxAuthModule } from 'app/ngrx/auth';
import { NgrxProductsModule } from 'app/ngrx/products';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
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
    CoreModule,
    NgrxCoreModule,
    RootSharedModule,
    RootProgressBarModule,
    NgrxAuthModule,
    NgrxProductsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
