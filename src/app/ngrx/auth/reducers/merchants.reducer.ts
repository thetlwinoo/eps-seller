import { createReducer, on } from '@ngrx/store';

import {
    MerchantActions
} from 'app/ngrx/auth/actions';
import { IMerchants } from '@root/models';

export const merchantFeatureKey = 'merchant';

export interface State {
    loaded: boolean;
    loading: boolean;
    merchant: IMerchants;
    error: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    merchant: null,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(MerchantActions.getLoginMerchant, state => ({
        ...state,
        loading: true,
    })),
    on(MerchantActions.getLoginMerchantSuccess, (state, { merchant }) => ({
        loaded: true,
        loading: false,
        merchant: merchant,
        error: ''
    })),
    on(MerchantActions.merchantError, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg
    }))
)

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getMerchant = (state: State) => state.merchant;

export const getError = (state: State) => state.error;
