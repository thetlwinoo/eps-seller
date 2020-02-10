import { createReducer, on } from '@ngrx/store';

import { SupplierActions } from 'app/ngrx/auth/actions';
import { ISuppliers } from '@eps/models';

export const supplierFeatureKey = 'supplier';

export interface State {
  loaded: boolean;
  loading: boolean;
  supplier: ISuppliers;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  supplier: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(SupplierActions.getLoginSupplier, state => ({
    ...state,
    loading: true,
  })),
  on(SupplierActions.getLoginSupplierSuccess, (state, { supplier }) => ({
    loaded: true,
    loading: false,
    supplier,
    error: '',
  })),
  on(SupplierActions.supplierError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getSupplier = (state: State) => state.supplier;

export const getError = (state: State) => state.error;
