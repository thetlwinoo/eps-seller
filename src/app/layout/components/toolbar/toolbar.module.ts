import { NgModule } from '@angular/core';
import { RootSharedModule } from '@root/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RootSharedModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
