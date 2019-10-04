import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, filter, mergeMap, switchMap } from 'rxjs/operators';
import { IMerchants } from '@root/models';
import { MerchantActions } from '../actions';
import { MerchantsService } from '@root/services';

@Injectable()
export class MerchantEffects {
    getLoginMerchant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MerchantActions.getLoginMerchant),
            switchMap(() =>
                this.merchantService.getOneByPrincipal().pipe(
                    filter((res: HttpResponse<IMerchants>) => res.ok),
                    map((res: HttpResponse<IMerchants>) => MerchantActions.getLoginMerchantSuccess({ merchant: res.body })),
                    catchError(err =>
                        of(MerchantActions.merchantError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private merchantService: MerchantsService
    ) { }
}