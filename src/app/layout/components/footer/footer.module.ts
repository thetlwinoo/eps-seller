import { NgModule } from '@angular/core';
import { RootSharedModule } from '@root/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    RootSharedModule,
    RouterModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
