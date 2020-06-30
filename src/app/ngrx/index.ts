import { ActionReducer, MetaReducer, Action, ActionReducerMap } from '@ngrx/store';
import { environment } from '@app/env';
import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer,
  }),
});

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
