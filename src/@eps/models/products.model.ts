import { IStockItems, IProductDocument, IProductTags } from '@eps/models';
import * as _ from 'lodash';
import { RootUtils } from '@eps/utils';
import { Moment } from 'moment';

export interface IProducts {
  id?: number;
  name?: string;
  handle?: string;
  productNumber?: string;
  searchDetails?: string;
  sellCount?: number;
  stockItemString?: any;
  totalWishlist?: number;
  totalStars?: number;
  discountedPercentage?: number;
  preferredInd?: boolean;
  availableDeliveryInd?: boolean;
  activeInd?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  releaseDate?: Moment;
  availableDate?: Moment;
  productDocumentId?: number;
  productDocument?: IProductDocument;
  stockItemLists?: IStockItems[];
  productTagList?: string[];
  supplierName?: string;
  supplierId?: number;
  productCategoryName?: string;
  productCategoryId?: number;
  productBrandName?: string;
  productBrandId?: number;
}

export class Products implements IProducts {
  constructor(
    public id?: number,
    public name?: string,
    public handle?: string,
    public productNumber?: string,
    public searchDetails?: string,
    public sellCount?: number,
    public stockItemString?: any,
    public totalWishlist?: number,
    public totalStars?: number,
    public discountedPercentage?: number,
    public preferredInd?: boolean,
    public availableDeliveryInd?: boolean,
    public activeInd?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public releaseDate?: Moment,
    public availableDate?: Moment,
    public productDocumentId?: number,
    public productDocument?: IProductDocument,
    public stockItemLists?: IStockItems[],
    public productTagList?: string[],
    public supplierName?: string,
    public supplierId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number,
    public productBrandName?: string,
    public productBrandId?: number
  ) {
    this.preferredInd = this.preferredInd || false;
    this.availableDeliveryInd = this.availableDeliveryInd || false;
    this.activeInd = this.activeInd || false;
    this.stockItemLists = this.stockItemLists || [];
    this.productTagList = this.productTagList || [];
    if (this.name) {
      this.handle = this.handle || RootUtils.handleize(this.name);
    }
  }
}
