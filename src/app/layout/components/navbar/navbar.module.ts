import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@eps/shared.module';
import { NavbarComponent } from './navbar.component';
import { Navbar1Module } from './navbar1/navbar1.module';
import { NavbarVerticalStyle1Module } from 'app/layout/components/navbar/vertical/style-1/style-1.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RootSharedModule,
    Navbar1Module,
    NavbarVerticalStyle1Module
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
