import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map, debounceTime, tap } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IStockItems, AlertType } from '@eps/models';
import { StockItemsService, ProductsService, StockItemTempService, UploadTransactionsService } from '@eps/services';
import { AccountService } from '@eps/core';
import { ITEMS_PER_PAGE } from '@eps/constants';
import { ClrDatagridStateInterface } from '@clr/angular';
// import { RootAlertService } from '@eps/components/alert/alert.service';
// import { DocumentProcessService } from '@eps/services';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  currentAccount: any;
  stockItems: IStockItems[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  // showImportModal = false;
  selectedMode = 0;
  loading = true;
  // uploadedFiles: any[] = [];
  // stockItemTempList: IStockItemTemp[] = [];
  // uploadTransactionList: IUploadTransactions[] = [];
  // uploadedTransactionid: number;
  // isUploaded = false;
  // isImported = false;
  // total = 0;
  // stockItemTempLinks: any;
  // loadingUploadExcel = false;
  // loadingUploadTransactions = true;

  countObj: any;

  filterType = 0;
  // uploadExcelArray: string[];
  // uploadData$: Observable<IUploadExcel[]>;
  // uploadData: IUploadExcel[];
  // selectedRows: UploadExcel[] = [];
  closeAlertInd = true;
  alertMessage: string;
  alertType: AlertType;

  constructor(
    protected stockItemsService: StockItemsService,
    // protected stockItemTempService: StockItemTempService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected productsService: ProductsService,
    // protected uploadTransactionsService: UploadTransactionsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });

    // const uploadExcel = new UploadExcel();
    // this.uploadExcelArray = Object.getOwnPropertyNames(uploadExcel);
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadCount();
    this.accountService.identity().pipe(
      map(account => {
        this.currentAccount = account;
      })
    );

    // this.uploadData$ = this.documentProcessService.data$.pipe(
    //   debounceTime(0),
    //   map(data => data),
    //   tap(data => {
    //     data.map(item => new UploadExcel(item));
    //   })
    // );

    // this.uploadData$.subscribe(data => (this.uploadData = data));
    this.registerChangeInStockItems();
  }

  loadAll(): void {
    const options = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    if (this.filterType === 1) {
      Object.assign(options, {
        'activeInd.equals': true,
      });
    }

    if (this.filterType === 2) {
      Object.assign(options, {
        'quantityOnHand.equals': 0,
      });
    }

    if (this.filterType === 3) {
      Object.assign(options, {
        'activeInd.equals': false,
      });
    }

    console.log('options', options);
    this.stockItemsService.findAll(options).subscribe(
      (res: HttpResponse<IStockItems[]>) => this.paginateStockItems(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  refresh(): void {
    this.onLoadStockItems({
      page: {
        from: 0,
        size: 5,
      },
    });
  }

  // onUploadExcelSelectAll(): void {
  //   this.selectedRows = this.uploadData;
  // }

  // onUploadExcelUnSelectAll(): void {
  //   this.selectedRows = [];
  // }

  onLoadStockItems(state: ClrDatagridStateInterface): void {
    this.loading = true;
    this.itemsPerPage = state.page.size;
    this.page = state.page.current;
    this.loadPage(this.page);
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  loadCount(): void {
    this.stockItemsService
      .loadCount()
      .pipe(
        filter((res: HttpResponse<number>) => res.ok),
        map((res: HttpResponse<number>) => res.body)
      )
      .subscribe(res => {
        this.countObj = res;
      });
  }

  transition(): void {
    this.router.navigate(['/products/manage-products'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    });
    this.loadAll();
    // this.onLoadUploadTransactions({
    //   page: {
    //     from: 0,
    //     size: 5,
    //   },
    // });
  }

  showAlert(alertType: AlertType, alertMessage: string): void {
    this.alertMessage = alertMessage;
    this.alertType = alertType;
    this.closeAlertInd = false;
  }

  clear(): void {
    this.page = 0;
    this.router.navigate([
      '/products/manage-products',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    ]);
    this.loadAll();
  }

  // confirmDeleteStockItemTemp(id: number): void {
  //   this.uploadTransactionsService.delete(id).subscribe(response => {
  //     this.eventManager.broadcast({
  //       name: 'uploadTransactionsListModification',
  //       content: 'Deleted an uploadTransactions',
  //     });
  //     this.uploadedTransactionid = null;
  //     this.onLoadStockItemTemp({
  //       page: {
  //         from: 0,
  //         size: 5,
  //       },
  //     });
  //     this.rootAlertService.setMessage('Clear successfully', 'success');
  //   });
  // }

  updateStockItemActive(event): void {
    console.log('update', event);
    // this.subscribeToUpdateStockItemActiveResponse(this.productsService.updateStockItemActive(event.id, event.activeInd));
    this.subscribeToUpdateStockItemActiveResponse(this.stockItemsService.update(event));
  }

  onUpdateStockItemActiveSuccess(res): void {
    this.showAlert(AlertType.Success, res.body.name + ' has been sucessfully ' + (res.body.activeInd ? 'active' : 'inactive'));
    this.loadCount();
    // this.loadAll();
  }

  onUpdateStockItemActiveError(res): void {
    console.log('error', res);
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStockItems): number {
    return item.id;
  }

  registerChangeInStockItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('stockItemsListModification', response => this.loadAll());
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected subscribeToUpdateStockItemActiveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res: HttpResponse<any>) => this.onUpdateStockItemActiveSuccess(res),
      (err: HttpErrorResponse) => this.onUpdateStockItemActiveError(err)
    );
  }

  protected paginateStockItems(data: IStockItems[], headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.stockItems = data;
    this.loading = false;
  }

  protected onError(errorMessage: string): void {
    this.loading = false;
    this.showAlert(AlertType.Danger, errorMessage);
    // this.jhiAlertService.error(errorMessage, null, null);
  }
}
