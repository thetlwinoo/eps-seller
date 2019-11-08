import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { rootAnimations } from '@epm/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductCategory, IProductChoice, IProductAttribute, IProductOption, IBarcodeTypes, StockItems, IProducts, Products } from '@epm/models';

import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions, CategoryActions } from 'app/ngrx/products/actions';
// import { ProductSku } from './product-sku.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ImageUtils } from '@epm/services';
import { ProductsDTO, StockItemsDTO } from '@epm/dto';

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
  barcodeTypes$: Observable<IBarcodeTypes[]>;
  productChoice: IProductChoice;
  categoryId$: Observable<number>;
  categoryId: number;
  productOptionId: number;
  productAttribueId: number;
  attributeList: IProductAttribute[];
  optionList: IProductOption[];
  stockItemsColumns: any[];
  frozenCols: any[];
  noChoiceInd: boolean = false;
  attributeInd: boolean = false;
  optionInd: boolean = false;
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
    this.barcodeTypes$ = this.store.pipe(select(fromProducts.getFetchBarcodeTypes)) as Observable<IBarcodeTypes[]>;

    this.productAttributeList$.subscribe(data => {
      data.map(item => {
        this.productAttributeListCombo.push({
          label: item.productAttributeValue,
          value: item
        })
      });
    });

    this.productOptionList$.subscribe(data => {
      data.map(item => {
        this.productOptionListCombo.push({
          label: item.productOptionValue,
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
        this.categoryId = categoryId;
        if (categoryId) {
          this.store.dispatch(FetchActions.fetchProductChoice({ id: categoryId }));
        }
      });

    this.productChoice$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.productChoice = data.length ? data[0] : null;
        // this.resetChoice();        
        if (this.productChoice) {
          const attributeSetName = this.productChoice.productAttributeSetProductAttributeSetName;
          const optionSetName = this.productChoice.productOptionSetProductOptionSetValue;
          if (attributeSetName == 'NoAttributeSet' && optionSetName == 'NoOptionSet') {
            this.noChoiceInd = true;
            this.attributeInd = false;
            this.optionInd = false;

            if (this.products.stockItemLists.length <= 0) {
              const stockItem = new StockItemsDTO();
              this.products.stockItemLists.push(stockItem);
            }
          } else {
            this.noChoiceInd = false;
            this.attributeInd = attributeSetName !== 'NoAttributeSet' ? true : false;
            this.optionInd = optionSetName !== 'NoOptionSet' ? true : false;
          }
        }
      });

    this.store.dispatch(FetchActions.fetchCategories());
    this.store.dispatch(FetchActions.fetchBarcodeType());
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

  // resetChoice() {
  //   this.productsForm.patchValue({
  //     productAttribute: null,
  //     productOption: null
  //   });
  //   this.products.resetChoice();
  // }
  addAttribute(event) {
    const attribute = this.productsForm.getRawValue().productAttribute;
    // console.log('this.products',this.products)
    this.products.addAttribute(attribute, this.noChoiceInd, this.attributeInd, this.optionInd);
  }

  addOption(event) {
    const option = this.productsForm.getRawValue().productOption;
    this.products.addOption(option, this.noChoiceInd, this.attributeInd, this.optionInd);
  }

  compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
