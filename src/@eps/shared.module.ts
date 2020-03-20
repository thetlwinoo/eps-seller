import { NgModule } from '@angular/core';

import { ResourceSharedLibsModule } from './shared-libs.module';
import { BreadcrumbGuard } from './services';
@NgModule({
  imports: [ResourceSharedLibsModule],
  declarations: [],
  providers: [BreadcrumbGuard],
  exports: [ResourceSharedLibsModule],
})
export class RootSharedModule {}
