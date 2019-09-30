import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootPipesModule } from '@root/pipes';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { ResourceSharedCommonModule } from './shared-common.module';
import { RootDirectivesModule } from '@root/directives/directives';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { JhiLoginModalComponent } from '@root/components';
// import { RootSidebarModule } from '@root/components';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ResourceSharedCommonModule,
        ResourceSharedLibsModule,
        RootDirectivesModule,
        RootPipesModule,
        // RootSidebarModule
    ],
    declarations: [
        // JhiLoginModalComponent
    ],
    providers: [],
    exports: [
        CommonModule,
        FlexLayoutModule,
        ResourceSharedCommonModule,
        RootDirectivesModule,
        RootPipesModule,
        // RootSidebarModule
    ],
    entryComponents: [
        // JhiLoginModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RootSharedModule {
}
