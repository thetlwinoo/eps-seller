import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService } from '@root/services';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { rootAnimations } from '@root/animations';
import { RootUtils } from '@root/utils';

import { IMerchants } from '@root/models';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { ProductActions } from 'app/ngrx/products/actions';
import { ProductsDTO } from '@root/dto';

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductsUpdateComponent implements OnInit {

  actionsSubscription: Subscription;
  products: ProductsDTO;
  isSaving: boolean;
  pageType: string;
  productsForm: FormGroup;
  selectedTab: number = 0;
  merchant$: Observable<IMerchants>;
  merchant: IMerchants;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private store: Store<fromProducts.State>,
    private storeAuth: Store<fromAuth.State>,
    route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    protected activatedRoute: ActivatedRoute
  ) {
    // this.products = new Products();
    this._unsubscribeAll = new Subject();
    this.merchant$ = this.storeAuth.pipe(select(fromAuth.getMerchantFetched)) as Observable<IMerchants>;
    this.merchant$.pipe(takeUntil(this._unsubscribeAll)).subscribe(merchant => this.merchant = merchant);

    this.actionsSubscription = route.params
      .pipe(map(params => ProductActions.selectProduct({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ products }) => {
        this.products = products;
        if (products.id) {
          this.pageType = 'edit';
        } else {
          this.pageType = 'new';
        }
        this.productsForm = this.createProductForm();
        console.log('this.productsForm',this.productsForm.getRawValue())
      });

    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

  createProductForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.products.id],
      merchantId: [this.products.merchant ? this.products.merchant.id : ''],
      productName: [this.products.productName],
      productNumber: [this.products.productNumber],
      searchDetails: [this.products.searchDetails],
      warrantyPeriod: [this.products.warrantyPeriod],
      warrantyPolicy: [this.products.warrantyPolicy],
      whatInTheBox: [this.products.whatInTheBox],
      stockItemLists: [this.products.stockItemLists],
      warrantyType: [this.products.warrantyType],
      productModel: [this.products.productModel],
      productBrand: [this.products.productBrand],
      productCategory: [this.products.productCategory],
      productCategoryName: [this.products.productCategory ? this.products.productCategory.parent.name + " / " + this.products.productCategory.name : ''],
      productAttributeList: [this.products.productAttributeList],
      productOptionList: [this.products.productOptionList],
      productAttribute: [],
      productOption: []
    });
  }

  saveProduct(): void {
    const data = this.productsForm.getRawValue();
    data.stockItemLists = this.products.stockItemLists;
    data.searchDetails = data.productName ? data.productName : '';
    data.merchant = this.merchant ? this.merchant : null;
    data.productCategory.createdDate = null;
    data.productCategory.lastModifiedDate = null;
    data.handle = data.productName ? RootUtils.handleize(data.productName) : null;
    if (this.pageType == 'new') {
      this.store.dispatch(ProductActions.createProduct({ product: data }));
    } else {
      this.store.dispatch(ProductActions.updateProduct({ product: data }));
    }

    // this._matSnackBar.open('Product saved', 'OK', {
    //   verticalPosition: 'top',
    //   duration: 2000
    // });
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.actionsSubscription.unsubscribe();
  }

}
