import { NgModule } from '@angular/core';
import { ResourceSharedLibsModule } from './shared-libs.module';


@NgModule({
    imports: [
        ResourceSharedLibsModule,
    ],
    declarations: [
    ],
    exports: [
        ResourceSharedLibsModule
    ],
    providers: []
})
export class ResourceSharedCommonModule { }
