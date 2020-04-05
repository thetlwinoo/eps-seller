import { createAction, props } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { IProducts, Products, StockItems, IStockItems, IPhotos } from '@eps/models';

export const loadProduct = createAction('[Product Exists Guard] Load Product', props<{ product: IProducts }>());

export const selectProduct = createAction('[View Product] Select Product', props<{ id: number }>());

export const searchProductsWithNoPaging = createAction('[Find Product] Search Products With No Paging', props<{ keyword: string }>());

export const searchProductsWithPaging = createAction('[Find Product] Search Products With Paging', props<{ query: any }>());

export const searchWithPagingSuccess = createAction('[Products/API] Search Success', props<{ payload: any }>());

export const searchWithNoPagingSuccess = createAction('[Products/API] Search Success', props<{ products: IProducts[] }>());

export const createProduct = createAction('[Products/API] Create Product', props<{ product: Products }>());

export const updateProduct = createAction('[Products/API] Update Product', props<{ product: Products }>());

export const saveProduct = createAction('[Products/API] Save Product', props<{ product: IProducts }>());

export const saveProductSuccess = createAction('[Products/API] Save Product Success', props<{ product: IProducts }>());

export const saveStockItem = createAction('[Products/API] Save StockItem', props<{ stockItems: IStockItems[]; product: IProducts }>());

export const saveStockItemSuccess = createAction('[Products/API] Save StockItem Success', props<{ stockItem: IStockItems }>());

export const importProduct = createAction('[Products/API] Import Product', props<{ product: IProducts }>());

export const importProductSuccess = createAction('[Products/API] Import Product Success', props<{ product: IProducts }>());

export const importStockItem = createAction('[Products/API] Import StockItem', props<{ stockItems: IStockItems[]; product: IProducts }>());

export const importStockItemSuccess = createAction('[Products/API] Import StockItem Success', props<{ stockItem: IStockItems }>());

export const saveStockItemListSuccess = createAction('[Products/API] Save StockItem List Success');

export const saveStockItemPhoto = createAction(
  '[Products/API] Save StockItem Photo',
  props<{ photos: IPhotos[]; stockItem: IStockItems }>()
);

export const saveStockItemPhotoSuccess = createAction('[Products/API] Save StockItem Photo Success', props<{ photo: IPhotos }>());

export const saveStockItemPhotoListSuccess = createAction('[Products/API] Save StockItem Photo List Success');

export const searchFailure = createAction('[Products/API] Search Failure', props<{ errorMsg: string }>());

export const productFailure = createAction('[Products/API] Product Failure', props<{ errorMsg: string }>());
