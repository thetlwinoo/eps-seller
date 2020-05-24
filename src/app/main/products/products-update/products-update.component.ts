import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService, ProductsService, ProductDocumentService, StockItemsService } from '@eps/services';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { rootAnimations } from '@eps/animations';
import { RootUtils } from '@eps/utils';

import {
  ISuppliers,
  Products,
  IProductCategory,
  IProductDocument,
  IStockItems,
  IProductAttribute,
  IProductOption,
  StockItems,
} from '@eps/models';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { ProductActions, FetchActions } from 'app/ngrx/products/actions';
import { ProductsDTO } from '@eps/dto';

@Component({
  selector: 'products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class ProductsUpdateComponent implements OnInit {
  actionsSubscription: Subscription;
  products: Products;
  isSaving: boolean;
  pageType: string;
  productsForm: FormGroup;
  selectedTab = 0;
  supplier$: Observable<ISuppliers>;
  supplier: ISuppliers;
  stockItems$: Observable<IStockItems[]>;
  stockItems: IStockItems[];
  productDocument$: Observable<IProductDocument>;
  productDocument: IProductDocument;
  selectedCategory$: Observable<IProductCategory>;
  selectedCategory: IProductCategory;

  showImportCompleted = false;

  // selectedProductAttributeList$: Observable<IProductAttribute[]>;
  // selectedProductAttributeList: IProductAttribute[];
  // selectedProductOptionList$: Observable<IProductOption[]>;
  // selectedProductOptionList: IProductOption[];

  categoryId$: Observable<number>;
  categoryId: number;
  loadingForm = true;
  dangerousGoods: any;
  // Private
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private store: Store<fromProducts.State>,
    private storeAuth: Store<fromAuth.State>,
    route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    protected activatedRoute: ActivatedRoute,
    protected productsService: ProductsService,
    protected productDocumentService: ProductDocumentService,
    protected stockItemsService: StockItemsService
  ) {
    // this.products = new Products();
    this.supplier$ = this.storeAuth.pipe(select(fromAuth.getSupplierFetched));
    this.supplier$.pipe(takeUntil(this._unsubscribeAll)).subscribe(supplier => (this.supplier = supplier));
    this.stockItems$ = this.store.pipe(select(fromProducts.getFetchStockItems));
    this.supplier$.pipe(takeUntil(this._unsubscribeAll)).subscribe(supplier => (this.supplier = supplier));
    this.productDocument$ = this.store.pipe(select(fromProducts.getFetchProductDocument));
    // this.selectedProductAttributeList$ = this.store.pipe(select(fromProducts.getSelectedProductAttribute));
    // this.selectedProductOptionList$ = this.store.pipe(select(fromProducts.getSelectedProductOption));
    // this.categoryId$ = this.store.pipe(select(fromProducts.getSelectedCategoryId));
    this.selectedCategory$ = this.store.pipe(select(fromProducts.getSelectedCategory));

    this.actionsSubscription = route.params
      .pipe(map(params => ProductActions.selectProduct({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnInit(): void {
    this.isSaving = false;
    this.activatedRoute.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ products }) => {
      this.products = products;
      if (products.id) {
        this.pageType = 'edit';
      } else {
        this.pageType = 'new';
      }

      // this.categoryId$.pipe(takeUntil(this._unsubscribeAll)).subscribe(categoryId => {
      //   this.categoryId = categoryId;
      //   if (categoryId) {
      //     this.store.dispatch(FetchActions.fetchProductChoice({ id: categoryId }));
      //   }
      // });

      this.selectedCategory$.pipe(takeUntil(this._unsubscribeAll)).subscribe(category => {
        this.selectedCategory = category;

        this.productDocument$.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
          this.productDocument = res;

          if (res.dangerousGoods) {
            this.dangerousGoods = {
              battery: false,
              liquid: false,
              none: false,
              flammable: false,
            };

            res.dangerousGoods.split(',').map(item => {
              switch (item.toLowerCase()) {
                case 'battery':
                  this.dangerousGoods.battery = true;
                  break;
                case 'liquid':
                  this.dangerousGoods.liquid = true;
                  break;
                case 'none':
                  this.dangerousGoods.none = true;
                  break;
                case 'flammable':
                  this.dangerousGoods.flammable = true;
                  break;
              }
            });
          }

          this.stockItems$.pipe(takeUntil(this._unsubscribeAll)).subscribe(stockItemsRes => {
            this.stockItems = stockItemsRes;
            // this.selectedProductAttributeList$
            //   .pipe(takeUntil(this._unsubscribeAll))
            //   .subscribe(productAttributeListRes => (this.selectedProductAttributeList = productAttributeListRes));

            // this.selectedProductOptionList$
            //   .pipe(takeUntil(this._unsubscribeAll))
            //   .subscribe(productOptionListRes => (this.selectedProductOptionList = productOptionListRes));
            if (
              this.selectedCategory &&
              this.productDocument &&
              this.stockItems
              // this.selectedProductAttributeList &&
              // this.selectedProductOptionList
            ) {
              this.productsForm = this.createProductForm();
            }
          });
        });
      });
    });

    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

  createProductForm(): FormGroup {
    // console.log('productDocument', this.productDocument, this.selectedCategory, this.stockItems);
    return this._formBuilder.group({
      id: [this.products.id],
      supplierId: [this.products.supplierId ? this.products.supplierId : ''],
      name: [this.products.name],
      productNumber: [this.products.productNumber],
      searchDetails: [this.products.searchDetails],
      stockItemLists: this._formBuilder.array(this.createStockItemArrayForm(this.stockItems)),
      productBrandId: [this.products.productBrandId],
      productBrandName: [this.products.productBrandName],
      // productAttributeList: this._formBuilder.array(this.createProductAttributeArrayForm(this.selectedProductAttributeList)),
      // productOptionList: this._formBuilder.array(this.createProductOptionArrayForm(this.selectedProductOptionList)),
      // productAttribute: null,
      // productOption: null,
      productCategoryId: [this.selectedCategory.id],
      productCategoryName: [this.selectedCategory.name],
      productCategoryLabel: [this.selectedCategory.parentName + ' / ' + this.selectedCategory.name],
      productDocument: this._formBuilder.group(this.productDocument),
    });
  }

  createStockItemArrayForm(stockItems: IStockItems[]): any[] {
    const stockItemList: any[] = [];
    stockItems.map(item => {
      stockItemList.push(this._formBuilder.group(item));
    });
    return stockItemList;
  }

  onAddStockItem(event): void {
    const stockItem = new StockItems();
    this.stockItems.push(stockItem);
    this.productsForm = this.createProductForm();
  }
  // createProductAttributeArrayForm(productAttributes): any[] {
  //   const productAttributeList: any[] = [];
  //   productAttributes.map(item => {
  //     productAttributeList.push(this._formBuilder.group(item));
  //   });

  //   return productAttributeList;
  // }

  // createProductOptionArrayForm(productOptions): any[] {
  //   const productOptionList: any[] = [];
  //   productOptions.map(item => {
  //     productOptionList.push(this._formBuilder.group(item));
  //   });

  //   return productOptionList;
  // }

  // createProductAttributeForm(stockItems): any[] {
  //   const productAttributeList: IProductAttribute[] = [];
  //   stockItems.map(stockItem => {
  //     this.store.pipe(select(fromProducts.selectProductAttribute(stockItem.productAttributeId))).subscribe(res=> {

  //     });
  //   });

  //   return stockItemList;
  // }

  saveProduct(): void {
    const product = this.productsForm.getRawValue();
    // if (this.pageType === 'new') {
    //   this.store.dispatch(ProductActions.createProduct({ product: data }));
    // } else {
    //   this.store.dispatch(ProductActions.updateProduct({ product: data }));
    // }
    console.log('formdata', product);
    this.productDocumentService.importProductDocument(product.productDocument).subscribe(productDocumentRes => {
      product.productDocumentId = productDocumentRes.id;
      this.productsService.importProduct(product).subscribe(productResource => {
        product.stockItemLists.map(stockItem => {
          stockItem.productId = productResource.id;
          this.stockItemsService.importStockItem(stockItem).subscribe(() => {
            this.showImportCompleted = true;
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.actionsSubscription.unsubscribe();
  }
}
