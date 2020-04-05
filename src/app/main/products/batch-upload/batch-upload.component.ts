import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IStockItems, IStockItemTemp, IUploadTransactions, UploadExcel, Products, StockItems } from '@eps/models';
import { StockItemsService, ProductsService, StockItemTempService, UploadTransactionsService, DocumentProcessService } from '@eps/services';
import { RootAlertService } from '@eps/components/alert/alert.service';
import { Observable, Subject } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ClrDatagridStateInterface } from '@clr/angular';
import { filter, map, debounceTime, tap } from 'rxjs/operators';
import { JhiParseLinks, JhiDataUtils, JhiAlertService } from 'ng-jhipster';
import * as _ from 'lodash';
import { RootUtils } from '@eps/utils';
import * as moment from 'moment';
import { CURRENCY_FORMAT } from '@eps/constants';

import { select, Store } from '@ngrx/store';
import * as fromProducts from 'app/ngrx/products/reducers';
import { ProductActions } from 'app/ngrx/products/actions';

@Component({
  selector: 'app-batch-upload',
  templateUrl: './batch-upload.component.html',
  styleUrls: ['./batch-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BatchUploadComponent implements OnInit, OnDestroy {
  @ViewChild('file', { static: true }) file: ElementRef;

  uploadTransactionList: IUploadTransactions[] = [];
  isUploaded = false;
  isImported = false;
  selectedMode = 0;
  total = 0;
  uploadedTransactionid: number;
  loading = true;
  loadingUploadExcel = false;
  loadingUploadTransactions = true;
  stockItemTempList: IStockItemTemp[] = [];
  stockItemTempLinks: any;
  errorMessage = '';
  errorVisible = false;
  uploadedFiles: any[] = [];

  filterType = 0;
  uploadExcelArray: string[];
  uploadData$: Observable<UploadExcel[]>;
  uploadData: UploadExcel[];
  selectedRows: UploadExcel[] = [];
  productList: Products[] = [];

  private unsubscribeAll: Subject<any>;

  constructor(protected rootAlertService: RootAlertService, protected productsService: ProductsService, protected stockItemTempService: StockItemTempService, protected parseLinks: JhiParseLinks, protected uploadTransactionsService: UploadTransactionsService, protected dataUtils: JhiDataUtils, protected jhiAlertService: JhiAlertService, protected documentProcessService: DocumentProcessService, protected stockItemsService: StockItemsService, private store: Store<fromProducts.State>, ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.uploadData$ = this.documentProcessService.data$.pipe(
      debounceTime(0),
      map(data => data.map(item => new UploadExcel(item))),
      tap((data: UploadExcel[]) => data.splice(0, 1))
    );

    this.uploadData$.subscribe(data => {
      this.uploadData = data;

      this.productList = [];
      const grouped = _.mapValues(_.groupBy(data, 'productName'), clist => clist.map(item => _.omit(item, 'productName')));
      _.entries(grouped).map(mapArray => {
        const key = mapArray[0];
        const values: UploadExcel[] = mapArray[1];

        let product: Products = new Products();
        product.name = key;
        product.handle = RootUtils.handleize(key);
        product.productCategoryName = values[0].productSubCategory;
        product.productBrandName = values[0].brandName;
        product.stockItemLists = [];

        let searchDetails = "";
        values.map(item => {
          let stockItem: StockItems = new StockItems();
          stockItem.name = item.itemName;
          stockItem.vendorCode = item.vendorCode;
          stockItem.vendorSKU = item.vendorSKU;
          stockItem.barcode = item.barcode;
          stockItem.unitPrice = item.sellingPrice;
          stockItem.recommendedRetailPrice = item.retailPrice;
          stockItem.quantityOnHand = item.quantityOnHand;
          stockItem.itemLength = item.itemLength;
          stockItem.itemWidth = item.itemWidth;
          stockItem.itemHeight = item.itemHeight;
          stockItem.itemWeight = item.itemWeight;
          stockItem.itemPackageLength = item.itemPackageLength;
          stockItem.itemPackageWidth = item.itemPackageWidth;
          stockItem.itemPackageHeight = item.itemPackageHeight;
          stockItem.itemPackageWeight = item.itemPackageWeight;
          stockItem.noOfPieces = item.noOfPieces;
          stockItem.noOfItems = item.noOfItem;
          stockItem.manufacture = item.manufacture;
          stockItem.sellStartDate = moment();
          stockItem.sellEndDate = moment();
          stockItem.customFields = '';
          stockItem.thumbnailUrl = '';
          stockItem.activeInd = false;
          stockItem.lastEditedBy = '';
          stockItem.itemLengthUnitCode = item.itemLengthUnit;
          stockItem.itemWidthUnitCode = item.itemWidthUnit;
          stockItem.itemHeightUnitCode = item.itemHeightUnit;
          stockItem.packageLengthUnitCode = item.packageLengthUnit || '';
          stockItem.packageWidthUnitCode = item.packageWidthUnit || '';
          stockItem.packageHeightUnitCode = item.packageHeightUnit || '';
          stockItem.itemPackageWeightUnitCode = item.itemPackageWeightUnit || '';
          stockItem.productAttributeValue = item.productAttribute;
          stockItem.productOptionValue = item.productOption;
          stockItem.materialName = item.productMaterial;
          stockItem.barcodeTypeName = item.barcodeType;
          stockItem.currencyCode = CURRENCY_FORMAT;

          product.stockItemLists.push(stockItem);
          searchDetails = searchDetails + item.searchKeywords + ';';
        });

        product.searchDetails = [...new Set(searchDetails.split(';'))].join(';').slice(0, -1);
        this.productList.push(product);
      });
    })
  }

  protected subscribeToImportResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res: HttpResponse<any>) => this.onImportSuccess(res),
      (err: HttpErrorResponse) => this.onImportError(err)
    );
  }

  onUpload(event: any): void {
    this.uploadedFiles = [];
    for (const file of event.target.files) {
      this.uploadedFiles.push(file);
    }

    // this.subscribeToUploadResponse(this.productsService.upload(this.uploadedFiles[0]));
    this.documentProcessService.parseExcelFile(this.uploadedFiles[0]);
    this.loadingUploadExcel = false;
  }

  onUploadExcelSelectAll(): void {
    this.selectedRows = this.uploadData;
  }

  onUploadExcelUnSelectAll(): void {
    this.selectedRows = [];
  }

  confirmDeleteStockItemTemp(id: number): void {
    this.documentProcessService.clearData();
    this.selectedRows = [];
    this.rootAlertService.setMessage('Clear successfully', 'success');
  }

  clearUploadedRecords() {
    this.documentProcessService.clearData();
    this.selectedRows = [];
    this.file.nativeElement.value = '';
  }

  protected onImportSuccess(res): void {
    this.onLoadStockItemTemp({
      page: {
        from: 0,
        current: 0,
        size: 5,
      },
    });
    this.isImported = true;
    this.rootAlertService.setMessage('File imported successfully', 'success');
  }

  protected onImportError(err): void {
    this.isImported = false;
    this.rootAlertService.setMessage('File import failed', 'danger');
  }

  onImportToSystem(event: any): void {
    // this.subscribeToImportResponse(this.productsService.importToSystem(this.uploadedTransactionid));
    // const list = this.productList.slice(0, 1);

    this.productList.map(product => {
      // this.store.dispatch(ProductActions.importProduct({ product: product }));
      this.productsService.importProduct(product).subscribe((productResource) => {
        product.stockItemLists.map(stockItem => {
          stockItem.productId = productResource.id;
          this.stockItemsService.importStockItem(stockItem).subscribe((res) => console.log('success', res));
        })
      });
    })
  }

  onLoadStockItemTemp(state: ClrDatagridStateInterface): void {
    this.loadingUploadExcel = true;

    if (!this.uploadedTransactionid) {
      this.stockItemTempList = [];
      this.total = 0;
      this.loadingUploadExcel = false;
      return;
    }

    this.stockItemTempService
      .getAllByTransactionId(state.page.current, state.page.size, this.uploadedTransactionid)
      .pipe(
        filter((res: HttpResponse<IStockItemTemp[]>) => res.ok),
        map((res: HttpResponse<IStockItemTemp[]>) => res)
      )
      .subscribe(result => {
        this.stockItemTempList = result.body;
        this.stockItemTempLinks = this.parseLinks.parse(result.headers.get('link'));
        this.total = parseInt(result.headers.get('X-Total-Count'), 10);
        this.loadingUploadExcel = false;
      });
  }

  refreshOnUpload(event): void { }

  onLoadUploadTransactions(state: ClrDatagridStateInterface): void {
    this.loadingUploadTransactions = true;
    this.uploadTransactionsService
      .findAll()
      .pipe(
        filter((res: HttpResponse<IStockItemTemp[]>) => res.ok),
        map((res: HttpResponse<IStockItemTemp[]>) => res)
      )
      .subscribe(result => {
        this.uploadTransactionList = result.body;
        this.loadingUploadTransactions = false;
        console.log('this.uploadTransactionList', this.uploadTransactionList);
      });
  }

  openFile(contentType, field): any {
    return this.dataUtils.openFile(contentType, field);
  }

  protected onError(errorMessage: string): void {
    console.log('errorMessage', errorMessage);
    this.errorVisible = true;
    this.loading = false;
    this.errorMessage = errorMessage;
    this.jhiAlertService.error(errorMessage, null, null);
  }

  ngOnDestroy(): void {
    this.clearUploadedRecords();
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
