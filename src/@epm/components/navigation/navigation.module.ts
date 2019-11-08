import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { MatRippleModule } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
import { RootSharedModule } from '@epm/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { RootNavigationComponent } from './navigation.component';
import { RootNavVerticalItemComponent } from './vertical/item/item.component';
import { RootNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { RootNavVerticalGroupComponent } from './vertical/group/group.component';
import { RootNavHorizontalItemComponent } from './horizontal/item/item.component';
import { RootNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,
        RootSharedModule,
        // MatIconModule,
        // MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        RootNavigationComponent
    ],
    declarations: [
        RootNavigationComponent,
        RootNavVerticalGroupComponent,
        RootNavVerticalItemComponent,
        RootNavVerticalCollapsableComponent,
        RootNavHorizontalItemComponent,
        RootNavHorizontalCollapsableComponent
    ]
})
export class RootNavigationModule
{
}
