import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@eps/shared.module';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    RootSharedModule
  ],
  exports:[
    AlertComponent
  ]
})
export class AlertModule { }
