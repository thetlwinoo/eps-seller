import { NgModule } from '@angular/core';

import { RootSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        RootSidebarComponent
    ],
    exports     : [
        RootSidebarComponent
    ]
})
export class RootSidebarModule
{
}
