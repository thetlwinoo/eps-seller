import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { Navbar1Module } from './navbar1/navbar1.module';
import { RootSharedModule } from '@root/shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RootSharedModule,
    Navbar1Module
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
