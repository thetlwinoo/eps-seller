import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IStockItems, IStockItemTemp, IUploadTransactions } from '@eps/models';
import { StockItemsService, ProductsService, StockItemTempService, UploadTransactionsService } from '@eps/services';
import { AccountService } from '@eps/core';
import { ITEMS_PER_PAGE } from '@eps/constants';
import { ClrDatagridStateInterface } from '@clr/angular';
import { RootAlertService } from '@eps/components/alert/alert.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  errorVisible = false;
  errorMessage = '';
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
  showImportModal = false;
  selectedMode = 0;
  uploadedFiles: any[] = [];
  stockItemTempList: IStockItemTemp[] = [];
  uploadTransactionList: IUploadTransactions[] = [];
  uploadedTransactionid: number;
  isUploaded = false;
  isImported = false;
  total = 0;
  stockItemTempLinks: any;
  loading = true;
  loadingStockItemTemp = true;
  loadingUploadTransactions = true;

  countObj: any;

  filterType = 0;

  constructor(
    protected stockItemsService: StockItemsService,
    protected stockItemTempService: StockItemTempService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected productsService: ProductsService,
    protected uploadTransactionsService: UploadTransactionsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected rootAlertService: RootAlertService,
    protected dataUtils: JhiDataUtils
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
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
    this.onLoadUploadTransactions({
      page: {
        from: 0,
        size: 5,
      },
    });
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

  ngOnInit(): void {
    this.loadAll();
    this.loadCount();
    this.accountService.identity().pipe(
      map(account => {
        this.currentAccount = account;
      })
    );
    this.registerChangeInStockItems();
  }

  confirmDeleteStockItemTemp(id: number): void {
    this.uploadTransactionsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'uploadTransactionsListModification',
        content: 'Deleted an uploadTransactions',
      });
      this.uploadedTransactionid = null;
      this.onLoadStockItemTemp({
        page: {
          from: 0,
          size: 5,
        },
      });
      this.rootAlertService.setMessage('Clear successfully', 'success');
    });
  }

  updateStockItemActive(event): void {
    console.log('update', event);
    this.subscribeToUpdateStockItemActiveResponse(this.productsService.updateStockItemActive(event.id, event.activeInd));
  }

  onUpdateStockItemActiveSuccess(res): void {
    console.log('success active', res);
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

  onUpload(event: any): void {
    for (const file of event.target.files) {
      this.uploadedFiles.push(file);
    }

    this.subscribeToUploadResponse(this.productsService.upload(this.uploadedFiles[0]));
  }

  onImportToSystem(event: any): void {
    this.subscribeToImportResponse(this.productsService.importToSystem(this.uploadedTransactionid));
  }

  onLoadStockItemTemp(state: ClrDatagridStateInterface): void {
    this.loadingStockItemTemp = true;
    // We convert the filters from an array to a map,
    // because that's what our backend-calling service is expecting
    // let filters: { [prop: string]: any[] } = {};
    // if (state.filters) {
    //   for (let filter of state.filters) {
    //     let { property, value } = <{ property: string, value: string }>filter;
    //     filters[property] = [value];
    //   }
    // }

    if (!this.uploadedTransactionid) {
      this.stockItemTempList = [];
      this.total = 0;
      this.loadingStockItemTemp = false;
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
        this.loadingStockItemTemp = false;
      });
  }

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

  protected paginateStockItems(data: IStockItems[], headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.stockItems = data;
    this.loading = false;
  }

  protected onError(errorMessage: string): void {
    console.log('errorMessage', errorMessage);
    this.errorVisible = true;
    this.loading = false;
    this.errorMessage = errorMessage;
    this.jhiAlertService.error(errorMessage, null, null);
  }

  protected subscribeToUpdateStockItemActiveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res: HttpResponse<any>) => this.onUpdateStockItemActiveSuccess(res),
      (err: HttpErrorResponse) => this.onUpdateStockItemActiveError(err)
    );
  }

  protected subscribeToUploadResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res: HttpResponse<any>) => this.onUploadSuccess(res),
      (err: HttpErrorResponse) => this.onUploadError(err)
    );
  }

  protected subscribeToImportResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res: HttpResponse<any>) => this.onImportSuccess(res),
      (err: HttpErrorResponse) => this.onImportError(err)
    );
  }

  protected onUploadSuccess(res): void {
    console.log('upload success', res);
    this.uploadedTransactionid = res ? res.id : null;

    this.onLoadStockItemTemp({
      page: {
        from: 0,
        current: 0,
        size: 5,
      },
    });
    this.isUploaded = true;
    this.rootAlertService.setMessage('File uploaded successfully', 'success');
  }

  protected onUploadError(err): void {
    this.loadingStockItemTemp = false;
    this.isUploaded = false;
    this.rootAlertService.setMessage('File upload failed', 'danger');
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
}
