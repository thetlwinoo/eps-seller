import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService } from '@eps/services';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { rootAnimations } from '@eps/animations';
import { RootUtils } from '@eps/utils';

import { ISuppliers } from '@eps/models';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { ProductActions } from 'app/ngrx/products/actions';
import { ProductsDTO } from '@eps/dto';

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
  supplier$: Observable<ISuppliers>;
  supplier: ISuppliers;
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
    this.supplier$ = this.storeAuth.pipe(select(fromAuth.getSupplierFetched)) as Observable<ISuppliers>;
    this.supplier$.pipe(takeUntil(this._unsubscribeAll)).subscribe(supplier => this.supplier = supplier);

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
      });

    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

  createProductForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.products.id],
      supplierId: [this.products.supplier ? this.products.supplier.id : ''],
      productName: [this.products.productName],
      productNumber: [this.products.productNumber],
      searchDetails: [this.products.searchDetails],
      stockItemLists: [this.products.stockItemLists],
      productBrand: [this.products.productBrand],
      productCategory: [this.products.productCategory],
      productCategoryName: [this.products.productCategory ? this.products.productCategory.parent.name + " / " + this.products.productCategory.name : ''],
      productAttributeList: [this.products.productAttributeList],
      productOptionList: [this.products.productOptionList],
      productAttribute: null,
      productOption: null,
      document: this._formBuilder.group({
        videoUrl: [this.products.document ? this.products.document.videoUrl : ''],
        highlights: [this.products.document ? this.products.document.highlights : ''],
        longDescription: [this.products.document ? this.products.document.longDescription : ''],
        shortDescription: [this.products.document ? this.products.document.shortDescription : ''],
        description: [this.products.document ? this.products.document.description : ''],
        careInstructions: [this.products.document ? this.products.document.careInstructions : ''],
        productType: [this.products.document ? this.products.document.productType : ''],
        modelName: [this.products.document ? this.products.document.modelName : ''],
        modelNumber: [this.products.document ? this.products.document.modelNumber : ''],
        fabricType: [this.products.document ? this.products.document.fabricType : ''],
        specialFeatures: [this.products.document ? this.products.document.specialFeatures : ''],
        productComplianceCertificate: [this.products.document ? this.products.document.productComplianceCertificate : ''],
        genuineAndLegal: [this.products.document ? this.products.document.genuineAndLegal : false],
        countryOfOrigin: [this.products.document ? this.products.document.countryOfOrigin : ''],
        usageAndSideEffects: [this.products.document ? this.products.document.usageAndSideEffects : ''],
        safetyWarnning: [this.products.document ? this.products.document.safetyWarnning : ''],
        warrantyType: [this.products.document ? this.products.document.warrantyType : ''],
        warrantyPeriod: [this.products.document ? this.products.document.warrantyPeriod : ''],
        warrantyPolicy: [this.products.document ? this.products.document.warrantyPolicy : ''],
      })
    });
  }

  saveProduct(): void {
    const data = this.productsForm.getRawValue();
    data.stockItemLists = this.products.stockItemLists;
    data.searchDetails = data.productName ? data.productName : '';
    data.supplier = this.supplier ? this.supplier : null;
    this.cleanAuditDate(data.productCategory);
    this.cleanAuditDate(data.productBrand);
    data.handle = data.productName ? RootUtils.handleize(data.productName) : null;
    console.log('this.productsForm', this.productsForm.getRawValue())
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

  cleanAuditDate(object) {
    object.createdBy = null;
    object.createdDate = null;
    object.lastModifiedBy = null;
    object.lastModifiedDate = null;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.actionsSubscription.unsubscribe();
  }

}
