export interface IPhotoExtends {
  id?: number;
  blobId?: number;
  thumbnailUrl?: string;
  originalUrl?: string;
  bannerTallUrl?: string;
  bannerWideUrl?: string;
  circleUrl?: string;
  sharpenedUrl?: string;
  squareUrl?: string;
  watermarkUrl?: string;
  priority?: number;
  defaultInd?: boolean;
  stockItemId?: number;
  thumbnailContentType?: string;
  thumbnail?: any;
  originalContentType?: string;
  original?: any;
  bannerTallContentType?: string;
  bannerTall?: any;
  bannerWideContentType?: string;
  bannerWide?: any;
  circleContentType?: string;
  circle?: any;
  sharpenedContentType?: string;
  sharpened?: any;
  squareContentType?: string;
  square?: any;
  watermarkContentType?: string;
  watermark?: any;
  refId?: number;
}

export class PhotoExtends implements IPhotoExtends {
  constructor(
    public id?: number,
    public blobId?: number,
    public thumbnailUrl?: string,
    public originalUrl?: string,
    public bannerTallUrl?: string,
    public bannerWideUrl?: string,
    public circleUrl?: string,
    public sharpenedUrl?: string,
    public squareUrl?: string,
    public watermarkUrl?: string,
    public priority?: number,
    public defaultInd?: boolean,
    public stockItemId?: number,
    public thumbnailContentType?: string,
    public thumbnail?: any,
    public originalContentType?: string,
    public original?: any,
    public bannerTallContentType?: string,
    public bannerTall?: any,
    public bannerWideContentType?: string,
    public bannerWide?: any,
    public circleContentType?: string,
    public circle?: any,
    public sharpenedContentType?: string,
    public sharpened?: any,
    public squareContentType?: string,
    public square?: any,
    public watermarkContentType?: string,
    public watermark?: any,
    public refId?: number
  ) {
    this.defaultInd = this.defaultInd || false;
  }
}
