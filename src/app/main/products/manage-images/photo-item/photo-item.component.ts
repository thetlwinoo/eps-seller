import { Component, OnInit, Input, ElementRef, ViewEncapsulation, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPhotos, IStockItems, IPhotoExtends, PhotoExtends, IImages } from '@eps/models';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ImageUtils, ImagesService } from '@eps/services';
import { rootAnimations } from '@eps/animations';
import { StockItemsService, PhotosService } from '@eps/services';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SERVER_API_URL } from '@eps/constants';

@Component({
  selector: 'photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class PhotoItemComponent implements OnInit, OnChanges {
  @Input() photos: IPhotos;
  @Input() stockItems: IStockItems;
  @Output() error = new EventEmitter<{}>();
  @Output() alert = new EventEmitter<{}>();

  public imageBlobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend';

  isSaving: boolean;
  viewOriginal = false;
  photoExtend: IPhotoExtends;

  constructor(
    protected dataUtils: JhiDataUtils,
    protected imageUtils: ImageUtils,
    protected elementRef: ElementRef,
    protected stockItemsService: StockItemsService,
    protected photosService: PhotosService,
    protected imagesService: ImagesService,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.isSaving = false;
  }

  ngOnChanges(): void {
    if (this.photos) {
      // console.log(this.photos);
      this.photoExtend = new PhotoExtends();
      this.photoExtend.id = this.photos.id;
      this.photoExtend.stockItemId = this.photos.stockItemId;
      this.photoExtend.blobId = this.photos.blobId;
      this.photoExtend.thumbnailUrl = this.photos.thumbnailUrl;
      this.photoExtend.originalUrl = this.photos.originalUrl;
      this.photoExtend.defaultInd = this.photos.defaultInd;
      this.photoExtend.priority = this.photos.priority;
      // console.log('photoExtend', this.photoExtend);
    }
  }

  setFileData(event, entity, field, isImage): any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.imageUtils.handleFiles(event, entity, 'thumbnail', isImage),
        this.dataUtils.setFileData(event, entity, field, isImage),
      ]).then(() => {
        console.log('entity', entity);
        this.save(entity);
        resolve();
      }, reject);
    });
  }

  clearInputImage(entity): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.dataUtils.clearInputImage(entity, this.elementRef, 'thumbnail', 'thumbnailContentType', 'fileImage'),
        this.dataUtils.clearInputImage(entity, this.elementRef, 'original', 'originalContentType', 'fileImage'),
      ]).then(() => {
        if (entity.id) {
          this.imagesService.delete(entity.blobId).subscribe();
          this.photosService.delete(entity.id).subscribe();
        }
        resolve();
      }, reject);
    });
  }

  save(photos: IPhotoExtends): void {
    this.isSaving = true;
    // if (photos.id !== undefined) {
    //   this.subscribeToSaveResponse(this.photosService.updateExtend(photos));
    // } else {
    //   this.subscribeToSaveResponse(this.photosService.createExtend(photos));
    // }
    if (photos.id !== undefined) {
      this.imagesService
        .update(photos)
        .pipe(
          filter((res: HttpResponse<IImages>) => res.ok),
          map((res: HttpResponse<IImages>) => res.body)
        )
        .subscribe(image => {
          photos.blobId = image.id;
          photos.thumbnailUrl = `${image.id}/thumbnail`;
          photos.originalUrl = `${image.id}/original`;
          this.subscribeToSaveResponse(this.photosService.updateExtend(photos));
        });
    } else {
      this.imagesService
        .create(photos)
        .pipe(
          filter((res: HttpResponse<IImages>) => res.ok),
          map((res: HttpResponse<IImages>) => res.body)
        )
        .subscribe(image => {
          photos.blobId = image.id;
          photos.thumbnailUrl = `${image.id}/thumbnail`;
          photos.originalUrl = `${image.id}/original`;
          this.subscribeToSaveResponse(this.photosService.createExtend(photos));
        });
    }
  }

  setDefault(photos): void {
    this.photosService.setDefault(photos).subscribe(() => {
      this.eventManager.broadcast({
        name: 'photosListModification',
        content: 'Updated an photos',
      });
    });
  }

  deletePhoto(photo: IPhotoExtends): void {
    if (photo.defaultInd) {
      this.alert.emit('Cannot delete default photo');
    } else {
      this.clearInputImage(photo);
    }
  }

  getImageUrl(url): string {
    return `${this.imageBlobUrl}/${url}`;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhotos>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      (error: HttpErrorResponse) => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(event): void {
    console.log('event', event);
    this.photos = event.body;
    this.isSaving = true;
  }

  protected onSaveError(error: HttpErrorResponse): void {
    this.isSaving = false;
    this.clearInputImage(this.photos);
    this.error.emit(error.message);
  }
}
