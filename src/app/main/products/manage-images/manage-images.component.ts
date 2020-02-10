import { Component, OnInit, ViewEncapsulation, OnDestroy, ElementRef } from '@angular/core';
import { RootTranslationLoaderService } from '@eps/services';
import { rootAnimations } from '@eps/animations';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IStockItems, IPhotos, Photos } from '@eps/models';
import { AccountService, StockItemsService, PhotosService } from '@eps/services';
import { ITEMS_PER_PAGE } from '@eps/constants';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ImageUtils } from '@eps/services';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class ManageImagesComponent implements OnInit, OnDestroy {
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
  loading = true;
  selectedRows: any;

  constructor(
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    protected stockItemsService: StockItemsService,
    private photosService: PhotosService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected elementRef: ElementRef,
    protected dataUtils: JhiDataUtils,
    protected imageUtils: ImageUtils
  ) {
    this.itemsPerPage = 10;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.accountService.identity().pipe(
      map(account => {
        this.currentAccount = account;
      })
    );

    this.registerChangeInStockItems();
    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

  refresh(state: ClrDatagridStateInterface): void {
    this.loading = true;

    this.itemsPerPage = state.page.size;
    this.page = state.page.current;
    this.loadPage(this.page);
  }

  loadAll(): void {
    this.stockItemsService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IStockItems[]>) => this.paginateStockItems(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['/products/manage-images'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      },
    });
    this.loadAll();
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

  ngOnDestroy(): void {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStockItems): number {
    return item.id;
  }

  registerChangeInStockItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('stockItemsListModification', response => this.loadAll());
  }

  sort(): any {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  setFileData(event, entity, field, isImage): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.imageUtils.handleFiles(event, entity, 'thumbnailPhotoBlob', isImage),
        this.dataUtils.setFileData(event, entity, field, isImage),
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  clearInputImage(entity): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.dataUtils.clearInputImage(entity, this.elementRef, 'thumbnailPhotoBlob', 'thumbnailPhotoBlobContentType', 'fileImage'),
        this.dataUtils.clearInputImage(entity, this.elementRef, 'originalPhotoBlob', 'originalPhotoBlobContentType', 'fileImage'),
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  protected paginateStockItems(data: IStockItems[], headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);

    data.forEach(stockItem => {
      this.photosService
        .query({
          'stockItemId.equals': stockItem.id,
        })
        .pipe(
          filter((res: HttpResponse<IPhotos[]>) => res.ok),
          map((res: HttpResponse<IPhotos[]>) => res.body)
        )
        .subscribe((res: IPhotos[]) => {
          if (res.length) {
            const _length = res.length;
            for (let _i = 0; _i < 8 - _length; _i++) {
              const newPhoto = new Photos();
              newPhoto.stockItemId = stockItem.id;
              res.push(newPhoto);
            }
          } else {
            for (let _i = 0; _i < 8; _i++) {
              const newPhoto = new Photos();
              newPhoto.stockItemId = stockItem.id;
              res.push(newPhoto);
            }
          }

          stockItem.photoLists = res;
        });
    });

    this.stockItems = data;

    this.loading = false;
  }

  protected onError(errorMessage: string): void {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
