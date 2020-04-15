import { IProducts, IProductAttribute, IProductOption } from '@eps/models';
import { createSelector, createFeatureSelector, combineReducers, Action, resultMemoize } from '@ngrx/store';
import * as fromFetch from 'app/ngrx/products/reducers/fetch.reducer';
import * as fromCategory from 'app/ngrx/products/reducers/category.reducer';
import * as fromRoot from 'app/ngrx';
import * as fromSearch from 'app/ngrx/products/reducers/search.reducer';
import * as fromProducts from 'app/ngrx/products/reducers/products.reducer';
import { ITEMS_PER_PAGE } from '@eps/constants';
import { TreeNode } from 'primeng/api';
import { CommonUtils } from '@eps/utils/common.utils';

export const productsFeatureKey = 'products';

export interface ProductsState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromProducts.productsFeatureKey]: fromProducts.State;
  [fromFetch.fetchFeatureKey]: fromFetch.State;
  [fromCategory.categoryFeatureKey]: fromCategory.State;
}

export interface State extends fromRoot.State {
  [productsFeatureKey]: ProductsState;
}

export function reducers(state: ProductsState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromProducts.productsFeatureKey]: fromProducts.reducer,
    [fromFetch.fetchFeatureKey]: fromFetch.reducer,
    [fromCategory.categoryFeatureKey]: fromCategory.reducer,
  })(state, action);
}

export const getProductsState = createFeatureSelector<State, ProductsState>(productsFeatureKey);

export const getProductEntitiesState = createSelector(getProductsState, state => state.products);

export const getSelectedProductId = createSelector(getProductEntitiesState, fromProducts.getSelectedId);

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
  getProductEntities,
  getSelectedProductId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

// Search State
export const getSearchState = createSelector(getProductsState, (state: ProductsState) => state.search);
export const getSearchProductIds = createSelector(getSearchState, fromSearch.getIds);
export const getSearchKeyword = createSelector(getSearchState, fromSearch.getKeyword);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);
export const getSearchLinks = createSelector(getSearchState, fromSearch.getLinks);
export const getSearchTotalItems = createSelector(getSearchState, fromSearch.getTotalItems);
export const getSearchError = createSelector(getSearchState, fromSearch.getError);
export const getSearchResults = createSelector(getProductEntities, getSearchProductIds, (products, searchIds) =>
  searchIds.map(id => products[id]).filter((product): product is IProducts => product != null)
);

// Fetch State
export const getFetchState = createSelector(getProductsState, (state: ProductsState) => state.fetch);
export const getFetchError = createSelector(getFetchState, fromFetch.getError);
export const getFetchLoading = createSelector(getFetchState, fromFetch.getLoading);
export const getFetchCategories = createSelector(getFetchState, fromFetch.getCategories);
export const getFetchCategoriesTree = createSelector(getFetchCategories, entities => {
  const treeModel = [];
  entities.map(category => {
    const _category: any = {
      label: category.name,
      data: category,
      expandedIcon: 'folder-open',
      collapsedIcon: 'folder',
      childIcon: 'file',
      expanded: false,
      type: 'category',
      children: [],
    };

    category.children.map(subCategory => {
      const _subCategory = {
        label: subCategory.name,
        data: subCategory,
        expandedIcon: 'folder-open',
        collapsedIcon: 'folder',
        childIcon: 'file',
        active: false,
        type: 'sub-category',
      };
      _category.children.push(_subCategory);
    });

    treeModel.push(_category);
  });

  return treeModel;
});
export const getFetchModels = createSelector(getFetchState, fromFetch.getModels);
export const getFetchStockItems = createSelector(getFetchState, fromFetch.getStockItems);
export const getFetchProductDocument = createSelector(getFetchState, fromFetch.getProductDocument);
export const getFetchBrands = createSelector(getFetchState, fromFetch.getBrands);
export const getFetchProductChoice = createSelector(getFetchState, fromFetch.getProductChoice);
export const getFetchIsProductChoiceFetched = createSelector(getFetchState, fromFetch.getIsProductChoiceFetched);
export const getFetchProductAttributeList = createSelector(getFetchState, fromFetch.getProductAttributeList);
export const getFetchProductOptionList = createSelector(getFetchState, fromFetch.getProductOptionList);
export const getFetchWarrantyTypes = createSelector(getFetchState, fromFetch.getWarrantyTypes);
export const getFetchBarcodeTypes = createSelector(getFetchState, fromFetch.getBarcodeTypes);

export const getSelectedProductAttributeIds = createSelector(getFetchState, fromFetch.getProductAttributeIds);
export const getSelectedProductAttribute = createSelector(
  getFetchProductAttributeList,
  getSelectedProductAttributeIds,
  (entities, attributeIds) => {
    const result = attributeIds
      .map(id => entities.find(x => x.id === id))
      .filter((attribute): attribute is IProductAttribute => attribute != null);

    return result.filter((item, index) => result.indexOf(item) === index);
  }
);

export const getSelectedProductOptionIds = createSelector(getFetchState, fromFetch.getProductOptionIds);
export const getSelectedProductOption = createSelector(getFetchProductOptionList, getSelectedProductOptionIds, (entities, optionIds) => {
  const result = optionIds.map(id => entities.find(x => x.id === id)).filter((option): option is IProductOption => option != null);

  return result.filter((item, index) => result.indexOf(item) === index);
});

// Category State
export const getCategoryState = createSelector(getProductsState, (state: ProductsState) => state.category);
export const getSelectedCategoryId = createSelector(getCategoryState, fromCategory.getSelectedId);
export const getSelectedCategory = createSelector(
  getFetchCategories,
  getSelectedCategoryId,
  (entities, selectedId) => CommonUtils.findById(entities, selectedId) || null
);
