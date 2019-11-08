import { NgModule } from '@angular/core';

import { HasAnyAuthorityDirective } from '@epm/directives/auth/has-any-authority.directive';
import { RootIfOnDomDirective } from '@epm/directives/root-if-on-dom/root-if-on-dom.directive';
import { RootInnerScrollDirective } from '@epm/directives/root-inner-scroll/root-inner-scroll.directive';
import { RootPerfectScrollbarDirective } from '@epm/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootMatSidenavHelperDirective, RootMatSidenavTogglerDirective } from '@epm/directives/root-mat-sidenav/root-mat-sidenav.directive';
import { HeaderScrollDirective } from '@epm/directives/header-scroll.directive';

@NgModule({
    declarations: [
        HasAnyAuthorityDirective,
        RootIfOnDomDirective,
        RootInnerScrollDirective,
        RootMatSidenavHelperDirective,
        RootMatSidenavTogglerDirective,
        RootPerfectScrollbarDirective,
        HeaderScrollDirective
    ],
    imports     : [],
    exports     : [
        HasAnyAuthorityDirective,
        RootIfOnDomDirective,
        RootInnerScrollDirective,
        RootMatSidenavHelperDirective,
        RootMatSidenavTogglerDirective,
        RootPerfectScrollbarDirective,
        HeaderScrollDirective
    ]
})
export class RootDirectivesModule
{
}
