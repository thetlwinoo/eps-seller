import { NgModule } from '@angular/core';

import { EllipsisPipe } from './ellipsis.pipe';
import { SafePipe } from './safe.pipe';

export const PIPES = [SafePipe, EllipsisPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class RootPipesModule {}