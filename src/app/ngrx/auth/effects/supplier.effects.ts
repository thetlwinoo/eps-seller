import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, filter, mergeMap, switchMap } from 'rxjs/operators';
import { ISuppliers } from '@epm/models';
import { SupplierActions } from '../actions';
import { SuppliersService } from '@epm/services';

@Injectable()
export class SupplierEffects {
    getLoginSupplier$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SupplierActions.getLoginSupplier),
            switchMap(() =>
                this.supplierService.getSupplierByPrincipal().pipe(
                    filter((res: HttpResponse<ISuppliers>) => res.ok),
                    map((res: HttpResponse<ISuppliers>) => SupplierActions.getLoginSupplierSuccess({ supplier: res.body })),
                    catchError(err =>
                        of(SupplierActions.supplierError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private supplierService: SuppliersService
    ) { }
}