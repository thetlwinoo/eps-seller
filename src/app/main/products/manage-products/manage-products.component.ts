import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IStockItems, IStockItemTemp } from '@root/models';
import { AccountService, StockItemsService, ProductsService, StockItemTempService, UploadTransactionsService } from '@root/services';
import { ITEMS_PER_PAGE } from '@root/constants';
import { ClrDatagridStateInterface } from "@clr/angular";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
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
  showImportModal: boolean = false;
  selectedMode: number = 0;
  uploadedFiles: any[] = [];
  stockItemTempList: IStockItemTemp[] = [];
  uploadedTransactionid: number;
  isUploaded = false;
  isImported = false;
  total: number = 0;
  stockItemTempLinks: any;
  loading: boolean = true;

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
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.stockItemsService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IStockItems[]>) => this.paginateStockItems(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/products/manage-products'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/products/manage-products',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStockItems();
  }

  confirmDeleteStockItemTemp(id: number) {
    this.uploadTransactionsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'uploadTransactionsListModification',
        content: 'Deleted an uploadTransactions'
      });
      this.uploadedTransactionid = null;
      this.refresh({
        page: {
          from: 0,
          size: 5
        }
      });

    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStockItems) {
    return item.id;
  }

  registerChangeInStockItems() {
    this.eventSubscriber = this.eventManager.subscribe('stockItemsListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateStockItems(data: IStockItems[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.stockItems = data;
  }

  protected onError(errorMessage: string) {
    console.log('errorMessage', errorMessage);
    this.jhiAlertService.error(errorMessage, null, null);
  }

  onUpload(event: any) {
    for (const file of event.target.files) {
      this.uploadedFiles.push(file);
    }

    this.subscribeToUploadResponse(this.productsService.upload(this.uploadedFiles[0]));
  }

  onImportToSystem(event: any) {
    this.subscribeToUploadResponse(this.productsService.importToSystem(this.uploadedTransactionid));
  }

  protected subscribeToUploadResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onUploadSuccess(res), (err: HttpErrorResponse) => this.onUploadError(err));
  }

  protected subscribeToImportResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onImportSuccess(res), (err: HttpErrorResponse) => this.onImportError(err));
  }

  protected onUploadSuccess(res) {
    console.log('upload success', res);
    this.uploadedTransactionid = res.id;

    this.refresh({
      page: {
        from: 0,
        size: 5
      }
    });
    this.isUploaded = true;
  }

  protected onUploadError(err) {
    console.log('upload failed');
    this.isUploaded = false;
  }

  protected onImportSuccess(res) {
    console.log('import success', res);
    this.isImported = true;
  }

  protected onImportError(err) {
    console.log('import failed');
    this.isImported = false;
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
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
      this.loading = false;
      return;
    }

    console.log('refresh', this.uploadedTransactionid)
    this.stockItemTempService.getAllByTransactionId(state.page.from, state.page.size, this.uploadedTransactionid)
      .pipe(
        filter((res: HttpResponse<IStockItemTemp[]>) => res.ok),
        map((res: HttpResponse<IStockItemTemp[]>) => res)
      )
      .subscribe(result => {

        this.stockItemTempList = result.body;
        this.stockItemTempLinks = this.parseLinks.parse(result.headers.get('link'));
        this.total = parseInt(result.headers.get('X-Total-Count'), 10);
        console.log('result', result.body)
        this.loading = false;
      });
  }
}
