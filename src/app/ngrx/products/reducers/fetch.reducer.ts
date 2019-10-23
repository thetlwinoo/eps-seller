import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import { IProductCategory, IProductModel, IProductBrand, IProductChoice, IProductAttribute, IProductOption, IWarrantyTypes, IBarcodeTypes } from '@root/models';

export const fetchFeatureKey = 'fetch';

export interface State {
    categories: any[];
    models: IProductModel[];
    brands: IProductBrand[];
    productChoice: IProductChoice[];
    productAttributeList: IProductAttribute[];
    productOptionList: IProductOption[];
    warrantyTypes: IWarrantyTypes[];
    barcodeTypes: IBarcodeTypes[];
    isProductChoiceFetched: boolean;
    loading: boolean;
    error: string;
}

const initialState: State = {
    categories: [],
    models: [],
    brands: [],
    productChoice: [],
    productAttributeList: [],
    productOptionList: [],
    warrantyTypes: [],
    barcodeTypes: [],
    isProductChoiceFetched: false,
    loading: false,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(
        FetchActions.fetchCategories,
        FetchActions.fetchModels,
        (state) => {
            return {
                ...state,
                isProductChoiceFetched: false,
                loading: true,
                error: ''
            };
        }
    ),
    on(FetchActions.fetchCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchModelsSuccess, (state, { models }) => ({
        ...state,
        models: models,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchBrandsSuccess, (state, { brands }) => ({
        ...state,
        brands: brands,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchProductChoiceSuccess, (state, { choice }) => ({
        ...state,
        isProductChoiceFetched: true,
        productChoice: choice,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchProductAttributeSuccess, (state, { productAttributeList }) => ({
        ...state,
        productAttributeList: productAttributeList,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchProductOptionSuccess, (state, { productOptionList }) => ({
        ...state,
        productOptionList: productOptionList,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchWarrantyTypeSuccess, (state, { warrantyTypes }) => ({
        ...state,
        warrantyTypes: warrantyTypes,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchBarcodeTypeSuccess, (state, { barcodeTypes }) => ({
        ...state,
        barcodeTypes: barcodeTypes,
        loading: false,
        error: ''
    })),
)

export const getCategories = (state: State) => state.categories;

export const getModels = (state: State) => state.models;

export const getBrands = (state: State) => state.brands;

export const getProductChoice = (state: State) => state.productChoice;

export const getIsProductChoiceFetched = (state: State) => state.isProductChoiceFetched;

export const getProductAttributeList = (state: State) => state.productAttributeList;

export const getProductOptionList = (state: State) => state.productOptionList;

export const getWarrantyTypes = (state: State) => state.warrantyTypes;

export const getBarcodeTypes = (state: State) => state.barcodeTypes;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;