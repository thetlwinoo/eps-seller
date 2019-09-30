import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { RootProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        RootProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        // MatButtonModule,
        // MatIconModule,
        // MatProgressBarModule
    ],
    exports     : [
        RootProgressBarComponent
    ]
})
export class RootProgressBarModule
{
}
