import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@root/shared.module';
// import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { RootProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        RootProgressBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        RootSharedModule
        // MatButtonModule,
        // MatIconModule,
        // MatProgressBarModule
    ],
    exports: [
        RootProgressBarComponent
    ]
})
export class RootProgressBarModule {
}
