import { NgModule } from '@angular/core';

import { HasAnyAuthorityDirective } from '@eps/directives/auth/has-any-authority.directive';
import { RootIfOnDomDirective } from '@eps/directives/root-if-on-dom/root-if-on-dom.directive';
import { RootInnerScrollDirective } from '@eps/directives/root-inner-scroll/root-inner-scroll.directive';
import { RootPerfectScrollbarDirective } from '@eps/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootMatSidenavHelperDirective, RootMatSidenavTogglerDirective } from '@eps/directives/root-mat-sidenav/root-mat-sidenav.directive';
import { HeaderScrollDirective } from '@eps/directives/header-scroll.directive';

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
