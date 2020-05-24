import { NgModule, Injectable, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@eps/shared.module';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { StockItemsService } from '@eps/services';
import { UserRouteAccessService } from '@eps/core';
import { IStockItems, StockItems } from '@eps/models';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ProductsUpdateComponent } from './products-update/products-update.component';
import { ManageImagesComponent } from './manage-images/manage-images.component';
import { BasicFormComponent } from './products-update/basic-form/basic-form.component';
import { SkuFormComponent } from './products-update/sku-form/sku-form.component';
import { DecorationFormComponent } from './products-update/decoration-form/decoration-form.component';
import { IProducts, Products } from '@eps/models';
import { ProductsDTO } from '@eps/dto';
import { ProductsService } from '@eps/services';
import { ProductListComponent } from './manage-images/product-list/product-list.component';

import { select, Store } from '@ngrx/store';
import * as fromProducts from 'app/ngrx/products/reducers';
import { CategoryActions, FetchActions } from 'app/ngrx/products/actions';
import { InformationFormComponent } from './products-update/information-form/information-form.component';
import { StockItemsFilterPipe } from './filters/stock-items-filter.pipe';
import { PhotoItemComponent } from './manage-images/photo-item/photo-item.component';
import { DocumentProcessService } from '@eps/services';
import { BatchUploadComponent } from './batch-upload/batch-upload.component';
import { ImagesMissingFilterPipe } from './filters/manage-images-missing.pipe';

@Injectable({ providedIn: 'root' })
export class ProductsResolve implements Resolve<IProducts>, OnDestroy {
  categoryId$: Observable<number>;
  private unsubscribeAll: Subject<any> = new Subject();
  constructor(private service: ProductsService, private store: Store<fromProducts.State>) {
    this.categoryId$ = this.store.pipe(select(fromProducts.getSelectedCategoryId));

    this.categoryId$.pipe(takeUntil(this.unsubscribeAll)).subscribe(categoryId => {
      this.store.dispatch(FetchActions.fetchProductChoice({ id: categoryId }));
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((res: HttpResponse<Products>) => res.ok),
        map((res: HttpResponse<Products>) => {
          const products = res.body;
          this.store.dispatch(CategoryActions.selectCategory({ id: products.productCategoryId }));
          this.store.dispatch(FetchActions.fetchStockItems({ productId: products.id }));
          this.store.dispatch(FetchActions.fetchProductDocument({ id: products.id }));
          return products;
        })
      );
    }
    return of(new Products());
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}

const routes = [
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'resourceApp.products.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'manage-products/batch-upload',
    component: BatchUploadComponent,
    // resolve: {
    //   products: ProductsResolve,
    // },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'manage-products/new',
    component: ProductsUpdateComponent,
    resolve: {
      products: ProductsResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE',
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'manage-products/:id/edit',
    component: ProductsUpdateComponent,
    resolve: {
      products: ProductsResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE',
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'manage-products/:id',
    component: ProductsUpdateComponent,
    resolve: {
      products: ProductsResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE',
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'manage-products/:id/:handle',
    component: ProductsUpdateComponent,
    resolve: {
      products: ProductsResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE',
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'manage-images',
    component: ManageImagesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'resourceApp.products.home.title',
    },
    // canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [
    ManageProductsComponent,
    ProductsUpdateComponent,
    ManageImagesComponent,
    BasicFormComponent,
    SkuFormComponent,
    DecorationFormComponent,
    ProductListComponent,
    InformationFormComponent,
    StockItemsFilterPipe,
    ImagesMissingFilterPipe,
    PhotoItemComponent,
    BatchUploadComponent,
  ],
  imports: [CommonModule, RootSharedModule, RouterModule.forChild(routes)],
  providers: [DocumentProcessService, ImagesMissingFilterPipe],
})
export class ProductsModule {}
