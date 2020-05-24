import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IStockItems, UploadExcel, Products, StockItems, ProductDocument, IProductTags, ProductTags } from '@eps/models';
import { StockItemsService, ProductsService, DocumentProcessService, ProductDocumentService, ProductTagsService } from '@eps/services';
import { RootAlertService } from '@eps/components/alert/alert.service';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';
import { JhiParseLinks, JhiDataUtils, JhiAlertService } from 'ng-jhipster';
import * as _ from 'lodash';
import { RootUtils } from '@eps/utils';
import * as moment from 'moment';

import { select, Store } from '@ngrx/store';
import * as fromProducts from 'app/ngrx/products/reducers';
import { ProductActions } from 'app/ngrx/products/actions';
import { Router } from '@angular/router';
import { Account } from '@eps/core/user/account.model';
import { AccountService } from '@eps/core';

@Component({
  selector: 'app-batch-upload',
  templateUrl: './batch-upload.component.html',
  styleUrls: ['./batch-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BatchUploadComponent implements OnInit, OnDestroy {
  @ViewChild('file', { static: true }) file: ElementRef;

  account: Account;
  isUploaded = false;
  isImported = false;
  selectedMode = 0;
  total = 0;
  uploadedTransactionid: number;
  loading = true;
  loadingUploadExcel = false;
  loadingUploadTransactions = true;
  errorMessage = '';
  errorVisible = false;
  uploadedFiles: any[] = [];
  importCount = 0;
  importTotalCount = 0;
  importPercentage = 0.0;
  showImportCompleted = false;

  filterType = 0;
  uploadExcelArray: string[];
  uploadData$: Observable<UploadExcel[]>;
  uploadData: UploadExcel[];
  selectedRows: UploadExcel[] = [];
  productList: Products[] = [];
  tagList: string[] = [];

  private unsubscribeAll: Subject<any>;

  constructor(
    protected router: Router,
    protected rootAlertService: RootAlertService,
    protected productsService: ProductsService,
    protected productDocumentService: ProductDocumentService,
    protected parseLinks: JhiParseLinks,
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected documentProcessService: DocumentProcessService,
    protected stockItemsService: StockItemsService,
    private accountService: AccountService,
    private productTagsService: ProductTagsService,
    private store: Store<fromProducts.State>
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.uploadData$ = this.documentProcessService.data$.pipe(
      debounceTime(0),
      map(data => data.map(item => new UploadExcel(item))),
      tap((data: UploadExcel[]) => data.splice(0, 1))
    );

    this.accountService.identity().subscribe(account => {
      this.account = account;
    });

    this.uploadData$.subscribe(data => {
      this.tagList = [];
      console.log('upload data', data);
      this.importTotalCount = data.length;
      this.uploadData = data;

      this.productList = [];
      const grouped = _.mapValues(_.groupBy(data, 'productName'), clist => clist.map(item => _.omit(item, 'productName')));
      _.entries(grouped).map(mapArray => {
        const key = mapArray[0];
        const values: UploadExcel[] = mapArray[1];
        const product: Products = new Products();
        product.name = key;
        product.handle = RootUtils.handleize(key);
        product.productCategoryName = values[0].productSubCategory;
        product.productBrandName = values[0].brandName;
        product.releaseDate = values[0].releaseDate;
        product.availableDate = values[0].availableDate;
        product.lastEditedBy = this.account.id;
        product.lastEditedWhen = moment();
        // product.defaultUnitPrice = values[0].sellingPrice;
        // product.defaultRecommendedRetailPrice = values[0].retailPrice;

        product.stockItemLists = [];
        const productDocument: ProductDocument = new ProductDocument();
        productDocument.videoUrl = values[0].videoUrl || '';
        productDocument.highlights = values[0].highlights || '';
        productDocument.longDescription = values[0].longDescription || '';
        productDocument.shortDescription = values[0].shortDescription || '';
        productDocument.careInstructions = values[0].careInstruction || '';
        productDocument.productType = values[0].productType || '';
        productDocument.modelName = values[0].modelName || '';
        productDocument.modelNumber = values[0].modelNumber || '';
        productDocument.whatInTheBox = values[0].whatInTheBox || '';
        productDocument.specialFeatures = values[0].specialFeatures || '';
        productDocument.productComplianceCertificate = values[0].productComplianceCertificate || '';
        productDocument.genuineAndLegal = values[0].genuineAndLegal || false;
        productDocument.countryOfOrigin = values[0].countryOfOrigin || '';
        productDocument.usageAndSideEffects = values[0].instructionsForUsageAndSideEffects || '';
        productDocument.safetyWarnning = values[0].safetyWarnning || '';
        productDocument.warrantyPeriod = values[0].warrentyPeriod || '';
        productDocument.warrantyTypeName = values[0].warrantyType || '';
        productDocument.dangerousGoods = values[0].dangerousGoodsRegulations || '';
        // productDocument.warrantyType = warrantyTypes;

        product.productDocument = productDocument;
        let searchDetails = '';
        values.map(item => {
          const stockItem: StockItems = new StockItems();
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
          stockItem.currencyCode = item.currencyCode;
          stockItem.lastEditedBy = this.account.id;
          stockItem.lastEditedWhen = moment();

          product.stockItemLists.push(stockItem);
          searchDetails = searchDetails + item.searchKeywords + ';';

          item.searchKeywords.split(';').map(keyword => {
            if (!this.tagList.includes(keyword)) {
              this.tagList.push(keyword);
            }
          });
        });

        product.searchDetails = [...new Set(searchDetails.split(';'))].join(';').slice(0, -1);

        this.productList.push(product);
      });
      console.log(this.tagList, this.tagList.length);
    });
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

  clearUploadedRecords(): void {
    this.documentProcessService.clearData();
    this.selectedRows = [];
    this.file.nativeElement.value = '';
  }

  onImportToSystem(event: any): void {
    this.importCount = 0;
    this.productList.map(product => {
      console.log('product.productDocument', product.productDocument);
      this.productDocumentService.importProductDocument(product.productDocument).subscribe(productDocumentRes => {
        product.productDocumentId = productDocumentRes.id;
        this.productsService.importProduct(product).subscribe(productResource => {
          product.stockItemLists.map(stockItem => {
            stockItem.productId = productResource.id;
            this.stockItemsService.importStockItem(stockItem).subscribe(() => {
              this.importCount++;
              this.importPercentage = (this.importCount * 100) / this.importTotalCount;
              if (this.importPercentage === 100) {
                this.showImportCompleted = true;
              }
            });
          });
        });
      });
    });

    this.tagList.map(tag => {
      if (tag.length > 0) {
        const productTag: ProductTags = new ProductTags();
        productTag.name = tag;
        this.productTagsService.create(productTag).subscribe();
      }
    });
  }

  openFile(contentType, field): any {
    return this.dataUtils.openFile(contentType, field);
  }

  onCompletedImport(): void {
    this.showImportCompleted = false;
    this.router.navigate(['/products/manage-products']);
  }

  ngOnDestroy(): void {
    this.clearUploadedRecords();
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  protected onImportError(err): void {
    this.isImported = false;
    this.rootAlertService.setMessage('File import failed', 'danger');
  }

  protected onError(errorMessage: string): void {
    console.log('errorMessage', errorMessage);
    this.errorVisible = true;
    this.loading = false;
    this.errorMessage = errorMessage;
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
