import { createAction, props } from '@ngrx/store';

import { ISuppliers } from '@eps/models';

export const getLoginSupplier = createAction('[Supplier/API] Get Login Supplier');

export const getLoginSupplierSuccess = createAction('[Supplier/API] Get Login Supplier Success', props<{ supplier: ISuppliers }>());

export const supplierError = createAction('[Supplier/API] Supplier Error', props<{ errorMsg: string }>());
