import { createAction, props } from '@ngrx/store';

import {
  IBarcodeTypes,
  IProductModel,
  IProductBrand,
  IProductChoice,
  IProductAttribute,
  IProductOption,
  IWarrantyTypes,
  IProductDocument,
  IProductCategory,
  IStockItems,
} from '@eps/models';

export const fetchCategories = createAction('[Products/API] Fetch Categories');

export const fetchCategoriesSuccess = createAction('[Products/API] Fetch Categories Success', props<{ categories: IProductCategory[] }>());

export const fetchModels = createAction('[Products/API] Fetch Models', props<{ id: number }>());

export const fetchModelsSuccess = createAction('[Products/API] Fetch Models Success', props<{ models: IProductModel[] }>());

export const fetchBrands = createAction('[Products/API] Fetch Brands', props<{ id: number }>());

export const fetchBrandsSuccess = createAction('[Products/API] Fetch Brands Success', props<{ brands: IProductBrand[] }>());

export const fetchWarrantyType = createAction('[Products/API] Fetch Warranty Type');

export const fetchWarrantyTypeSuccess = createAction(
  '[Products/API] Fetch Warranty Type Success',
  props<{ warrantyTypes: IWarrantyTypes[] }>()
);

export const fetchProductChoice = createAction('[Products/API] Fetch Product Choice', props<{ id: number }>());

export const fetchProductChoiceSuccess = createAction('[Products/API] Fetch Product Choice Success', props<{ choice: IProductChoice[] }>());

export const fetchProductAttribute = createAction('[Products/API] Fetch Product Attribute', props<{ id: number }>());

export const fetchProductAttributeSuccess = createAction(
  '[Products/API] Fetch Product Attribute Success',
  props<{ productAttributeList: IProductAttribute[] }>()
);

export const fetchProductOption = createAction('[Products/API] Fetch Product Option', props<{ id: number }>());

export const fetchProductOptionSuccess = createAction(
  '[Products/API] Fetch Product Option Success',
  props<{ productOptionList: IProductOption[] }>()
);

export const fetchBarcodeType = createAction('[Products/API] Fetch Barcode Type');

export const fetchBarcodeTypeSuccess = createAction(
  '[Products/API] Fetch Barcode Type Success',
  props<{ barcodeTypes: IBarcodeTypes[] }>()
);

export const fetchProductDocument = createAction('[Products/API] Fetch Product Document', props<{ id: number }>());

export const fetchProductDocumentSuccess = createAction(
  '[Products/API] Fetch Product Document Success',
  props<{ productDocument: IProductDocument }>()
);

export const fetchStockItems = createAction('[Products/API] Fetch Stock Items', props<{ productId: number }>());

export const fetchStockItemsSuccess = createAction('[Products/API] Fetch Stock Items Success', props<{ stockItems: IStockItems[] }>());

export const fetchFailure = createAction('[Products/API] Fetch Failure', props<{ errorMsg: string }>());
