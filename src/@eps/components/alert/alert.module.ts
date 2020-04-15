import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootAlertComponent } from './alert.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [ClarityModule, CommonModule],
  declarations: [RootAlertComponent],
  exports: [RootAlertComponent],
})
export class RootAlertModule {}
