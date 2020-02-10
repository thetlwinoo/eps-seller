import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of, forkJoin, from } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
  filter,
  exhaustMap,
  flatMap,
  mergeMap,
  concatAll,
  concat,
  tap,
} from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { IProducts, Products, IPhotos, IStockItems } from '@eps/models';
import { ProductActions } from '../actions';
import { ProductsService, StockItemsService, PhotosService } from '@eps/services';
import * as _ from 'lodash';
import { RootUtils } from '@eps/utils';
import { SERVER_API_URL } from '@eps/constants';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  searchWithNoPaging$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType(ProductActions.searchProductsWithNoPaging),
      debounceTime(debounce, scheduler),
      switchMap(({ keyword }) => {
        if (keyword === '') {
          return empty;
        }

        const nextSearch$ = this.actions$.pipe(ofType(ProductActions.searchProductsWithNoPaging), skip(1));

        return this.productsService.searchAll(keyword).pipe(
          takeUntil(nextSearch$),
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            const products: IProducts[] = res.body;
            return ProductActions.searchWithNoPagingSuccess({ products });
          }),
          catchError(err => of(ProductActions.searchFailure({ errorMsg: err.message })))
        );
      })
    )
  );

  searchWithPaging$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType(ProductActions.searchProductsWithPaging),
      debounceTime(debounce, scheduler),
      switchMap(({ query }) => {
        if (!query) {
          return empty;
        }

        const nextSearch$ = this.actions$.pipe(ofType(ProductActions.searchProductsWithPaging), skip(1));

        console.log('final query', query);
        return this.productsService.search(query).pipe(
          takeUntil(nextSearch$),
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            const _payload = {
              products: res.body,
              links: this.parseLinks.parse(res.headers.get('link')),
              totalItems: parseInt(res.headers.get('X-Total-Count'), 10),
            };
            return ProductActions.searchWithPagingSuccess({ payload: _payload });
          }),
          catchError(err => of(ProductActions.searchFailure({ errorMsg: err.message })))
        );
      })
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) =>
        this.productsService.createProducts(product).pipe(
          filter((res: HttpResponse<IProducts>) => res.ok),
          switchMap((res: HttpResponse<IProducts>) => [ProductActions.saveProductSuccess({ product: res.body })]),
          tap(() => this.router.navigate(['/products/manage-products'])),
          catchError(err => of(ProductActions.productFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.productsService.updateProducts(product).pipe(
          filter((res: HttpResponse<IProducts>) => res.ok),
          switchMap((res: HttpResponse<IProducts>) => [ProductActions.saveProductSuccess({ product: res.body })]),
          tap(() => this.router.navigate(['/products/manage-products'])),
          catchError(err => of(ProductActions.productFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  // saveProduct$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(ProductActions.saveProduct),
  //         switchMap(({ product }) => {
  //             console.log('save product', product)
  //             if (!product) {
  //                 return empty;
  //             }
  //             this.productsService.saveProduct(product);
  //             // return this.productsService.create(product).pipe(
  //             //     filter((res: HttpResponse<IProducts>) => res.ok),
  //             //     switchMap((res: HttpResponse<IProducts>) => [
  //             //         ProductActions.saveProductSuccess({ product: res.body }),
  //             //         ProductActions.saveStockItem({ stockItems: product.stockItemLists, product: res.body }),
  //             //     ]),
  //             //     catchError(err =>
  //             //         of(ProductActions.productFailure({ errorMsg: err.message }))
  //             //     )
  //             // );
  //         })
  //     )
  // );

  // saveStockItem$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(ProductActions.saveStockItem),
  //         switchMap(({ stockItem }) => {
  //             console.log('save stockItem', stockItem)
  //             if (!stockItem) {
  //                 return empty;
  //             }

  //             return this.stockItemsService.create(stockItem).pipe(
  //                 filter((res: HttpResponse<IStockItems>) => res.ok),
  //                 switchMap((res: HttpResponse<IStockItems>) => [
  //                     ProductActions.saveStockItemSuccess({ stockItem: res.body }),
  //                     // ProductActions.saveStockItemPhoto({ photos: stockItem.photoLists })
  //                 ]),
  //                 catchError(err =>
  //                     of(ProductActions.productFailure({ errorMsg: err.message }))
  //                 )
  //             );
  //         })
  //     )
  // );

  // saveStockItemPhoto$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(ProductActions.saveStockItemPhoto),
  //         switchMap(({ photo, stockItem }) => {
  //             if (!photo) {
  //                 return empty;
  //             }
  //             photo.stockItemId = stockItem.id;
  //             console.log('save photo', photo, stockItem)
  //             return this.photosService.create(photo).pipe(
  //                 filter((res: HttpResponse<IPhotos>) => res.ok),
  //                 map((res: HttpResponse<IPhotos>) => ProductActions.saveStockItemPhotoSuccess({ photo: res.body })),
  //                 catchError(err =>
  //                     of(ProductActions.productFailure({ errorMsg: err.message }))
  //                 )
  //             );
  //         })
  //     )
  // );

  // saveStockItems$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(ProductActions.saveStockItem),
  //         switchMap(({ stockItems, product }) => {
  //             if (!stockItems.length) {
  //                 return empty;
  //             }

  //             from(
  //                 stockItems.map(stockItem => {
  //                     stockItem.productId = product.id;
  //                     stockItem.stockItemName = product.productName;
  //                     stockItem.thumbnailUrl = SERVER_API_URL + 'api/photos-extend?stockitem=' + stockItem.id;
  //                     return this.stockItemsService.create(stockItem).pipe(
  //                         filter((res: HttpResponse<IStockItems>) => res.ok),
  //                         map((res: HttpResponse<IStockItems>) => ProductActions.saveStockItemSuccess({ stockItem: res.body })
  //                             // of(ProductActions.saveStockItemPhoto({ photos: stockItem.photoLists, stockItem: res.body }))
  //                             // [
  //                             //     ProductActions.saveStockItemSuccess({ stockItem: res.body }),
  //                             //     ProductActions.saveStockItemPhoto({ photos: stockItem.photoLists })
  //                             // ]
  //                         ),
  //                         // catchError(err =>
  //                         //     of(ProductActions.productFailure({ errorMsg: err.message }))
  //                         // )
  //                     )
  //                 })
  //             ).pipe(
  //                 // map(() => {
  //                 //     return ProductActions.saveStockItemListSuccess();
  //                 // })
  //                 concatAll(),
  //                 concat(of(ProductActions.saveStockItemListSuccess()))
  //             ).subscribe(console.log);
  //         })
  //     )
  // );

  // saveStockItemPhotos$ = createEffect(() =>
  //     this.actions$.pipe(
  //         ofType(ProductActions.saveStockItemPhoto),
  //         switchMap(({ photos, stockItem }) => {
  //             console.log('working with photos', photos)
  //             if (!photos.length) {
  //                 return empty;
  //             }
  //             return forkJoin(
  //                 photos.filter(x => RootUtils.notEmpty(x.originalPhotoBlob)).map(photo => {
  //                     photo.stockItemId = stockItem.id;
  //                     this.photosService.create(photo).pipe(
  //                         filter((res: HttpResponse<IPhotos>) => res.ok),
  //                         map((res: HttpResponse<IPhotos>) => of(ProductActions.saveStockItemPhotoSuccess({ photo: res.body }))),
  //                         catchError(err =>
  //                             of(ProductActions.productFailure({ errorMsg: err.message }))
  //                         ))
  //                 })
  //             ).pipe(
  //                 map(() => {
  //                     return ProductActions.saveStockItemPhotoListSuccess();
  //                 })
  //             )
  //         })
  //     )
  // );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private stockItemsService: StockItemsService,
    private photosService: PhotosService,
    protected parseLinks: JhiParseLinks,
    private router: Router
  ) {}
}
