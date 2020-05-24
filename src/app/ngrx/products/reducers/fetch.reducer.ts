import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import {
  IProductCategory,
  IProductModel,
  IProductBrand,
  IProductChoice,
  IProductAttribute,
  IProductOption,
  IWarrantyTypes,
  IBarcodeTypes,
  IProductDocument,
  IStockItems,
} from '@eps/models';

export const fetchFeatureKey = 'fetch';

export interface State {
  categories: any[];
  // models: IProductModel[];
  stockItems: IStockItems[];
  productAttributeIds: number[];
  productOptionIds: number[];
  productDocument: IProductDocument;
  brands: IProductBrand[];
  productChoice: IProductChoice[];
  productAttributeList: IProductAttribute[];
  productAttribute: IProductAttribute;
  productOptionList: IProductOption[];
  productOption: IProductOption;
  warrantyTypes: IWarrantyTypes[];
  barcodeTypes: IBarcodeTypes[];
  isProductChoiceFetched: boolean;
  loading: boolean;
  error: string;
}

const initialState: State = {
  categories: [],
  // models: [],
  stockItems: [],
  productAttributeIds: [],
  productOptionIds: [],
  productDocument: {},
  brands: [],
  productChoice: [],
  productAttributeList: [],
  productAttribute: null,
  productOptionList: [],
  productOption: null,
  warrantyTypes: [],
  barcodeTypes: [],
  isProductChoiceFetched: false,
  loading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(FetchActions.fetchCategories, state => ({
    ...state,
    isProductChoiceFetched: false,
    loading: true,
    error: '',
  })),
  on(FetchActions.fetchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: '',
  })),
  // on(FetchActions.fetchModelsSuccess, (state, { models }) => ({
  //   ...state,
  //   models,
  //   loading: false,
  //   error: '',
  // })),
  on(FetchActions.fetchStockItemsSuccess, (state, { stockItems }) => ({
    ...state,
    stockItems,
    productAttributeIds: stockItems.map(stockItem => stockItem.productAttributeId),
    productOptionIds: stockItems.map(stockItem => stockItem.productOptionId),
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchProductDocumentSuccess, (state, { productDocument }) => ({
    ...state,
    productDocument,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchProductChoiceSuccess, (state, { choice }) => ({
    ...state,
    isProductChoiceFetched: true,
    productChoice: choice,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchProductAttributeSuccess, (state, { productAttributeList }) => ({
    ...state,
    productAttributeList,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchProductOptionSuccess, (state, { productOptionList }) => ({
    ...state,
    productOptionList,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchWarrantyTypeSuccess, (state, { warrantyTypes }) => ({
    ...state,
    warrantyTypes,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchBarcodeTypeSuccess, (state, { barcodeTypes }) => ({
    ...state,
    barcodeTypes,
    loading: false,
    error: '',
  }))
);

export const getCategories = (state: State) => state.categories;

// export const getModels = (state: State) => state.models;

export const getStockItems = (state: State) => state.stockItems;

export const getProductAttributeIds = (state: State) => state.productAttributeIds;

export const getProductOptionIds = (state: State) => state.productOptionIds;

export const getProductDocument = (state: State) => state.productDocument;

export const getBrands = (state: State) => state.brands;

export const getProductChoice = (state: State) => state.productChoice;

export const getIsProductChoiceFetched = (state: State) => state.isProductChoiceFetched;

export const getProductAttributeList = (state: State) => state.productAttributeList;

export const getProductOptionList = (state: State) => state.productOptionList;

export const getWarrantyTypes = (state: State) => state.warrantyTypes;

export const getBarcodeTypes = (state: State) => state.barcodeTypes;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
