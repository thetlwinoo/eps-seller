import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductActions } from 'app/ngrx/products/actions';
import { IProducts } from '@root/models';

export const productsFeatureKey = 'products';

export interface State extends EntityState<IProducts> {
    selectedProductId: number | null;
}

export const adapter: EntityAdapter<IProducts> = createEntityAdapter<IProducts>({
    selectId: (product: IProducts) => product.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedProductId: null,
});

export const reducer = createReducer(
    initialState,
    on(
        ProductActions.searchWithNoPagingSuccess,
        (state, { products }) => adapter.addMany(products, state)
    ),
    on(
        ProductActions.searchWithPagingSuccess,
        (state, { payload }) => adapter.addMany(payload.products, state)
    ),
    on(ProductActions.loadProduct, (state, { product }) => adapter.addOne(product, state)),
    on(ProductActions.selectProduct, (state, { id }) => ({
        ...state,
        selectedProductId: id,
    }))
);

export const getSelectedId = (state: State) => state.selectedProductId;