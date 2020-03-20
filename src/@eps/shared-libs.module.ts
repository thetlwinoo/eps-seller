import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { CookieModule } from 'ngx-cookie';
// import { ClarityModule } from '@clr/angular';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import { EditorModule } from 'primeng/editor';
import { TreeModule } from 'primeng/tree';
import { FileUploadModule } from 'primeng/fileupload';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RootAlertModule } from '@eps/components/alert/alert.module';
import { TooltipModule } from 'primeng/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RootDirectivesModule } from '@eps/directives/directives';
import { ClarityModule } from '@clr/angular';
import { RootPipesModule } from '@eps/pipes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RootPipesModule,
    NgbModule,
    NgJhipsterModule,
    FontAwesomeModule,
    ClarityModule,
    BreadcrumbModule,
    PaginatorModule,
    MessageModule,
    PanelModule,
    DropdownModule,
    NgxPicaModule,
    EditorModule,
    TreeModule,
    FileUploadModule,
    OverlayPanelModule,
    RootAlertModule,
    TooltipModule,
    FlexLayoutModule,
    RootDirectivesModule,
    TranslateModule,
  ],
  providers: [],
})
export class ResourceSharedLibsModule {}
