import { createAction, props } from '@ngrx/store';

import { IMerchants } from '@root/models';

export const getLoginMerchant = createAction('[Merchant/API] Get Login Merchant');

export const getLoginMerchantSuccess = createAction(
    '[Merchant/API] Get Login Merchant Success',
    props<{ merchant: IMerchants }>()
);

export const merchantError = createAction(
    '[Merchant/API] Merchant Error',
    props<{ errorMsg: string }>()
);