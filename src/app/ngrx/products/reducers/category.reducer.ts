import { createReducer, on } from '@ngrx/store';
import { CategoryActions } from 'app/ngrx/products/actions';
import { IProductCategory } from '@epm/models';

export const categoryFeatureKey = 'category';

export interface State {
    selectedCategoryId: number | null;
}

export const initialState: State = {
    selectedCategoryId: null
}

export const reducer = createReducer(
    initialState,
    on(CategoryActions.selectCategory, (state, { id }) => ({
        ...state,
        selectedCategoryId: id,
    }))
);

export const getSelectedId = (state: State) => state.selectedCategoryId;