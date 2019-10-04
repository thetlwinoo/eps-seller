import { Moment } from 'moment';
import * as moment from 'moment';
import { Photos, SpecialDeals } from '@root/models';
import { RootUtils } from '@root/utils';

export class PhotosDTO {
    id?: number;
    thumbnailPhoto?: string;
    originalPhoto?: string;
    bannerTallPhoto?: string;
    bannerWidePhoto?: string;
    circlePhoto?: string;
    sharpenedPhoto?: string;
    squarePhoto?: string;
    watermarkPhoto?: string;
    thumbnailPhotoBlobContentType?: string;
    thumbnailPhotoBlob?: any;
    originalPhotoBlobContentType?: string;
    originalPhotoBlob?: any;
    bannerTallPhotoBlobContentType?: string;
    bannerTallPhotoBlob?: any;
    bannerWidePhotoBlobContentType?: string;
    bannerWidePhotoBlob?: any;
    circlePhotoBlobContentType?: string;
    circlePhotoBlob?: any;
    sharpenedPhotoBlobContentType?: string;
    sharpenedPhotoBlob?: any;
    squarePhotoBlobContentType?: string;
    squarePhotoBlob?: any;
    watermarkPhotoBlobContentType?: string;
    watermarkPhotoBlob?: any;
    priority?: number;
    defaultInd?: boolean;
    deleteToken?: string;

    constructor(photo?) {
        photo = photo || {};
        this.id = photo.id || null;
        this.thumbnailPhoto = photo.thumbnailPhoto || null;
        this.originalPhoto = photo.originalPhoto || null;
        this.bannerTallPhoto = photo.bannerTallPhoto || null;
        this.bannerWidePhoto = photo.bannerWidePhoto || null;
        this.circlePhoto = photo.circlePhoto || null;
        this.sharpenedPhoto = photo.sharpenedPhoto || null;
        this.squarePhoto = photo.squarePhoto || null;
        this.watermarkPhoto = photo.watermarkPhoto || null;
        this.thumbnailPhotoBlobContentType = photo.thumbnailPhotoBlobContentType || null;
        this.thumbnailPhotoBlob = photo.thumbnailPhotoBlob || null;
        this.originalPhotoBlobContentType = photo.originalPhotoBlobContentType || null;
        this.originalPhotoBlob = photo.originalPhotoBlob || null;
        this.bannerTallPhotoBlobContentType = photo.bannerTallPhotoBlobContentType || null;
        this.bannerTallPhotoBlob = photo.bannerTallPhotoBlob || null;
        this.bannerWidePhotoBlobContentType = photo.bannerWidePhotoBlobContentType || null;
        this.bannerWidePhotoBlob = photo.bannerWidePhotoBlob || null;
        this.circlePhotoBlobContentType = photo.circlePhotoBlobContentType || null;
        this.circlePhotoBlob = photo.circlePhotoBlob || null;
        this.sharpenedPhotoBlobContentType = photo.sharpenedPhotoBlobContentType || null;
        this.sharpenedPhotoBlob = photo.sharpenedPhotoBlob || null;
        this.squarePhotoBlobContentType = photo.squarePhotoBlobContentType || null;
        this.squarePhotoBlob = photo.squarePhotoBlob || null;
        this.watermarkPhotoBlobContentType = photo.watermarkPhotoBlobContentType || null;
        this.watermarkPhotoBlob = photo.watermarkPhotoBlob || null;
        this.priority = photo.priority || null;
        this.defaultInd = photo.defaultInd || false;
        this.deleteToken = photo.deleteToken || null;
    }
}