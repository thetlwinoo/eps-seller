import { NgModule } from '@angular/core';

import { HasAnyAuthorityDirective } from '@root/directives/auth/has-any-authority.directive';
import { RootIfOnDomDirective } from '@root/directives/root-if-on-dom/root-if-on-dom.directive';
import { RootInnerScrollDirective } from '@root/directives/root-inner-scroll/root-inner-scroll.directive';
import { RootPerfectScrollbarDirective } from '@root/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootMatSidenavHelperDirective, RootMatSidenavTogglerDirective } from '@root/directives/root-mat-sidenav/root-mat-sidenav.directive';
import { HeaderScrollDirective } from '@root/directives/header-scroll.directive';

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
