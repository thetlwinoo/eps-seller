import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RootSidebarModule } from '@eps/components';
import { RootSharedModule } from '@eps/shared.module';
import { AlertModule } from 'app/layout/components/alert/alert.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';
import { HeaderModule } from 'app/layout/components/header/header.module';
import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';

import { Layout1Component } from './layout1.component';

@NgModule({
  declarations: [
    Layout1Component
  ],
  imports: [
    RouterModule,
    RootSidebarModule,
    RootSharedModule,
    CommonModule,
    AlertModule,
    NavbarModule,
    ToolbarModule,
    HeaderModule,
    ContentModule,
    FooterModule
  ],
  exports: [
    Layout1Component
  ]
})
export class Layout1Module { }
