import { ISuppliers } from '@eps/models';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromSupplier from 'app/ngrx/auth/reducers/supplier.reducer';
import * as fromRoot from 'app/ngrx';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromSupplier.supplierFeatureKey]: fromSupplier.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromSupplier.supplierFeatureKey]: fromSupplier.reducer,
  })(state, action);
}

export const getAuthState = createFeatureSelector<State, AuthState>(authFeatureKey);

// Supplier State
export const getSupplierState = createSelector(getAuthState, (state: AuthState) => state.supplier);

export const getSupplierError = createSelector(getSupplierState, fromSupplier.getError);

export const getSupplierFetched = createSelector(getSupplierState, fromSupplier.getSupplier);

export const getSupplierLoading = createSelector(getSupplierState, fromSupplier.getLoading);

export const getSupplierLoaded = createSelector(getSupplierState, fromSupplier.getLoaded);
