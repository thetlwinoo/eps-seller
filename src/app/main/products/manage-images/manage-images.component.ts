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
import { IStockItems, IPhotos, Photos, AlertType } from '@eps/models';
import { StockItemsService, PhotosService } from '@eps/services';
import { AccountService } from '@eps/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ImageUtils } from '@eps/services';
import { ImagesMissingFilterPipe } from '../filters/manage-images-missing.pipe';
import { EpsErrorHandler } from '@eps/utils/error.handler';
import { UploadFile } from 'ng-zorro-antd/upload';
import { SERVER_API_URL } from '@eps/constants';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class ManageImagesComponent implements OnInit, OnDestroy {
  public imageBlobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend';
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

  closeAlertInd = true;
  alertMessage: string;
  alertType: AlertType;
  missingImageInd = false;

  previewImage: string | undefined = '';
  previewVisible = false;

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
    protected imageUtils: ImageUtils,
    private imageMissingFilterPipe: ImagesMissingFilterPipe
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

    this.registerChanged();
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
        (res: HttpErrorResponse) => this.onError(res)
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

  registerChanged(): void {
    this.eventSubscriber = this.eventManager.subscribe('stockItemsListModification', () => this.loadAll());
    this.eventSubscriber = this.eventManager.subscribe('photosListModification', () => this.loadAll());
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

  showAlert(alertType: AlertType, alertMessage: string): void {
    this.alertMessage = alertMessage;
    this.alertType = alertType;
    this.closeAlertInd = false;
  }

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
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
          // let photosCount = 0;
          // if (res.length) {
          //   const _length = res.length;
          //   photosCount = _length;
          //   for (let _i = 0; _i < 8 - _length; _i++) {
          //     const newPhoto = new Photos();
          //     newPhoto.stockItemId = stockItem.id;
          //     res.push(newPhoto);
          //   }
          // }
          // else {
          //   for (let _i = 0; _i < 8; _i++) {
          //     const newPhoto = new Photos();
          //     newPhoto.stockItemId = stockItem.id;
          //     res.push(newPhoto);
          //   }
          // }
          stockItem.photoLists = [];
          res.map(item => {
            stockItem.photoLists.push({
              uid: item.id.toString(),
              name: item.blobId,
              status: 'done',
              thumbUrl: `${this.imageBlobUrl}/${item.thumbnailUrl}`,
              url: `${this.imageBlobUrl}/${item.originalUrl}`,
            });
          });
          // stockItem.photoLists = res;
          // stockItem.photosCount = photosCount;
        });
    });

    this.stockItems = data;

    this.loading = false;
  }

  protected onError(error: HttpErrorResponse): void {
    this.loading = false;
    this.showAlert(AlertType.Danger, EpsErrorHandler.getErrorMessage(error));
    // this.jhiAlertService.error(errorMessage, null, null);
  }

  protected onAlert(message: string): void {
    this.showAlert(AlertType.Info, message);
  }
}
