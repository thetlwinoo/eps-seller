export interface IPhotos {
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
  stockItemStockItemName?: string;
  stockItemId?: number;
}

export class Photos implements IPhotos {
  constructor(
    public id?: number,
    public thumbnailPhoto?: string,
    public originalPhoto?: string,
    public bannerTallPhoto?: string,
    public bannerWidePhoto?: string,
    public circlePhoto?: string,
    public sharpenedPhoto?: string,
    public squarePhoto?: string,
    public watermarkPhoto?: string,
    public thumbnailPhotoBlobContentType?: string,
    public thumbnailPhotoBlob?: any,
    public originalPhotoBlobContentType?: string,
    public originalPhotoBlob?: any,
    public bannerTallPhotoBlobContentType?: string,
    public bannerTallPhotoBlob?: any,
    public bannerWidePhotoBlobContentType?: string,
    public bannerWidePhotoBlob?: any,
    public circlePhotoBlobContentType?: string,
    public circlePhotoBlob?: any,
    public sharpenedPhotoBlobContentType?: string,
    public sharpenedPhotoBlob?: any,
    public squarePhotoBlobContentType?: string,
    public squarePhotoBlob?: any,
    public watermarkPhotoBlobContentType?: string,
    public watermarkPhotoBlob?: any,
    public priority?: number,
    public defaultInd?: boolean,
    public deleteToken?: string,
    public stockItemStockItemName?: string,
    public stockItemId?: number
  ) {
    this.defaultInd = this.defaultInd || false;
    this.originalPhotoBlobContentType = this.originalPhotoBlobContentType || null;
    this.originalPhotoBlob = this.originalPhotoBlob || null;
  }
}
