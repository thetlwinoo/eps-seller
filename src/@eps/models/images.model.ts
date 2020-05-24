export interface IImages {
  id?: number;
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

export class Images implements IImages {
  constructor(
    public id?: number,
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
  ) {}
}
