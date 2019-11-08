import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar1Component } from './navbar1.component';
import { RootSharedModule } from '@epm/shared.module';
import { RootNavigationModule } from '@epm/components';

@NgModule({
  declarations: [Navbar1Component],
  imports: [
    CommonModule,
    RootNavigationModule,
    RootSharedModule
  ],
  exports: [
    Navbar1Component
  ]
})
export class Navbar1Module { }
