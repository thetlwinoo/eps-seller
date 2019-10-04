import { IMerchants } from '@root/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';

import * as fromMerchant from 'app/ngrx/auth/reducers/merchants.reducer';
import * as fromRoot from 'app/ngrx';

export const authFeatureKey = 'auth';

export interface AuthState {
    [fromMerchant.merchantFeatureKey]: fromMerchant.State;
}

export interface State extends fromRoot.State {
    [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
    return combineReducers({
        [fromMerchant.merchantFeatureKey]: fromMerchant.reducer
    })(state, action);
}

export const getAuthState = createFeatureSelector<State, AuthState>(
    authFeatureKey
);

//Merchant State
export const getMerchantState = createSelector(
    getAuthState,
    (state: AuthState) => state.merchant
);

export const getMerchantError = createSelector(
    getMerchantState,
    fromMerchant.getError
);

export const getMerchantFetched = createSelector(
    getMerchantState,
    fromMerchant.getMerchant
);

export const getMerchantLoading = createSelector(
    getMerchantState,
    fromMerchant.getLoading
);

export const getMerchantLoaded = createSelector(
    getMerchantState,
    fromMerchant.getLoaded
);