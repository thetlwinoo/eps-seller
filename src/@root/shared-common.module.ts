import { NgModule } from '@angular/core';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { BreadcrumbGuard } from '@root/services';

@NgModule({
    imports: [
        ResourceSharedLibsModule,
    ],
    declarations: [
    ],
    exports: [
        ResourceSharedLibsModule
    ],
    providers: [
        BreadcrumbGuard
    ]
})
export class ResourceSharedCommonModule { }
