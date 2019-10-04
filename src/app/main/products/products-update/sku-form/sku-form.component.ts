import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, ElementRef, Output, EventEmitter } from '@angular/core';
import { rootAnimations } from '@root/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductCategory, IProductChoice, IProductAttribute, IProductOption, IStockItems, StockItems, IProducts, Products } from '@root/models';

import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions, CategoryActions } from 'app/ngrx/products/actions';
// import { ProductSku } from './product-sku.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ImageUtils } from '@root/services';
import { ProductsDTO } from '@root/dto';

@Component({
  selector: 'sku-form',
  templateUrl: './sku-form.component.html',
  styleUrls: ['./sku-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class SkuFormComponent implements OnInit, OnDestroy {
  @Input() productsForm: FormGroup;
  @Input() products: ProductsDTO;

  category$: Observable<IProductCategory>;
  productChoice$: Observable<IProductChoice[]>;
  productAttributeList$: Observable<IProductAttribute[]>;
  productOptionList$: Observable<IProductOption[]>;  
  productChoice: IProductChoice;
  categoryId$: Observable<number>;

  productOptionId: number;
  productAttribueId: number;
  attributeList: IProductAttribute[];
  optionList: IProductOption[];
  stockItemsColumns: any[];
  frozenCols: any[];

  // productSku: ProductSku;
  private _unsubscribeAll: Subject<any>;
  private productAttributeListCombo: any[] = [];
  private productOptionListCombo: any[] = [];

  constructor(
    private store: Store<fromProducts.State>,
    private _formBuilder: FormBuilder,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef,
    private imageUtils: ImageUtils,
  ) {
    this.categoryId$ = store.pipe(select(fromProducts.getSelectedCategoryId)) as Observable<number>;
    this.productChoice$ = store.pipe(select(fromProducts.getFetchProductChoice)) as Observable<IProductChoice[]>;
    this.productAttributeList$ = store.pipe(select(fromProducts.getFetchProductAttributeList)) as Observable<IProductAttribute[]>;
    this.productOptionList$ = store.pipe(select(fromProducts.getFetchProductOptionList)) as Observable<IProductOption[]>;    

    this.productAttributeList$.subscribe(data => {
      data.map(item => {
        this.productAttributeListCombo.push({
          label: item.value,
          value: item
        })
      });
    });

    this.productOptionList$.subscribe(data => {
      data.map(item => {
        this.productOptionListCombo.push({
          label: item.value,
          value: item
        })
      });
    });

    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.stockItemsColumns = [
      { field: 'guid', header: 'guid' },
      { field: 'productAttribute', header: 'Attribute' },
      { field: 'productOption', header: 'Option' },
      { field: 'sellerSKU', header: 'SellerSKU' },
      { field: 'quantityPerOuter', header: 'Quantity' },
      { field: 'recommendedRetailPrice', header: 'RetailPrice' },
      { field: 'unitPrice', header: 'UnitPrice' },
      { field: 'typicalWeightPerUnit', header: 'Weight(kg)' },
      { field: 'typicalLengthPerUnit', header: 'Length(cm)' },
      { field: 'typicalWidthPerUnit', header: 'Width(cm)' },
      { field: 'typicalHeightPerUnit', header: 'Height(cm)' }
    ];

    this.categoryId$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(categoryId => {
        this.store.dispatch(FetchActions.fetchProductChoice({ id: categoryId }));
      });

    this.productChoice$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data.length) {
          this.productChoice = data[0];
        }
      });

    this.store.dispatch(FetchActions.fetchCategories());
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.imageUtils.handleFiles(event, entity, 'thumbnailPhotoBlob', isImage),
        this.dataUtils.setFileData(event, entity, field, isImage)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  clearInputImage(entity) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.dataUtils.clearInputImage(entity, this.elementRef, 'thumbnailPhotoBlob', 'thumbnailPhotoBlobContentType', 'fileImage'),
        this.dataUtils.clearInputImage(entity, this.elementRef, 'originalPhotoBlob', 'originalPhotoBlobContentType', 'fileImage')
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  addAttribute(event) {
    const attribute = this.productsForm.getRawValue().productAttribute;
    // console.log('this.products',this.products)
    this.products.addAttribute(attribute);
  }

  addOption(event) {
    const option = this.productsForm.getRawValue().productOption;
    this.products.addOption(option);
  }

  compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }  

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
