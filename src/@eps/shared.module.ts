import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootPipesModule } from '@eps/pipes';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { ResourceSharedCommonModule } from './shared-common.module';
import { RootDirectivesModule } from '@eps/directives/directives';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { JhiLoginModalComponent } from '@eps/components';
// import { RootSidebarModule } from '@eps/components';

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
