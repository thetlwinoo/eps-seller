import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPhotos } from '@eps/models';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ImageUtils } from '@eps/services';
import { rootAnimations } from '@eps/animations';
import { StockItemsService, PhotosService } from '@eps/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class PhotoItemComponent implements OnInit {
  @Input() photos: IPhotos;
  isSaving: boolean;
  viewOriginal = false;
  constructor(
    protected dataUtils: JhiDataUtils,
    protected imageUtils: ImageUtils,
    protected elementRef: ElementRef,
    protected stockItemsService: StockItemsService,
    protected photosService: PhotosService,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.isSaving = false;
  }

  setFileData(event, entity, field, isImage): any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.imageUtils.handleFiles(event, entity, 'thumbnailPhotoBlob', isImage),
        this.dataUtils.setFileData(event, entity, field, isImage),
      ]).then(() => {
        this.save(entity);
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
        this.confirmDelete(entity.id);
        resolve();
      }, reject);
    });
  }

  save(photos): void {
    this.isSaving = true;
    // const photos = this.createFromForm();
    if (photos.id !== undefined) {
      this.subscribeToSaveResponse(this.stockItemsService.updatePhoto(photos));
    } else {
      this.subscribeToSaveResponse(this.stockItemsService.addPhoto(photos));
    }
  }

  confirmDelete(id: number): void {
    this.photosService.deleteExtend(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'photosListModification',
        content: 'Deleted an photos',
      });
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhotos>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    // this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
