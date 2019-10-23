import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { IPhotos } from '@root/models';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ImageUtils } from '@root/services';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class PhotoItemComponent implements OnInit {
  @Input() photo: IPhotos;
  viewOriginal: boolean = false;
  constructor(
    protected dataUtils: JhiDataUtils,
    protected imageUtils: ImageUtils,
    protected elementRef: ElementRef,
  ) { }

  ngOnInit() {
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
}
