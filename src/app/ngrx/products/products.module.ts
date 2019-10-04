import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FetchEffects, ProductEffects } from 'app/ngrx/products/effects';
import * as fromProducts from 'app/ngrx/products/reducers';

@NgModule({
    imports: [            
        StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.reducers),

        EffectsModule.forFeature([FetchEffects, ProductEffects])
    ]
})
export class NgrxProductsModule { }