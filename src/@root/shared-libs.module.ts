import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieModule } from 'ngx-cookie';
import { ClarityModule } from '@clr/angular';

@NgModule({
    imports: [
        CookieModule.forRoot(),
        FontAwesomeModule,
        ClarityModule,
        NgbModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgJhipsterModule,
        FontAwesomeModule,
        ClarityModule,
        NgbModule
    ],
    providers: [
    ]
})
export class ResourceSharedLibsModule {
    static forRoot() {
        return {
            ngModule: ResourceSharedLibsModule
        };
    }
}
