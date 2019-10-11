import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SupplierEffects } from 'app/ngrx/auth/effects';
import * as fromAuth from 'app/ngrx/auth/reducers';

export const COMPONENTS = [
];

export const CONTAINERS = [
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([SupplierEffects])
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class NgrxAuthModule { }
