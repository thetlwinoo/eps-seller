export interface IPhotos {
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
}

export class Photos implements IPhotos {
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
    public stockItemId?: number
  ) {
    this.defaultInd = this.defaultInd || false;
  }
}
