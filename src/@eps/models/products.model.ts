import { IStockItems, IProductDocument } from '@eps/models';
import * as _ from 'lodash';
import { RootUtils } from '@eps/utils';
import { Moment } from 'moment';

export interface IProducts {
  id?: number;
  name?: string;
  handle?: string;
  productNumber?: string;
  searchDetails?: any;
  sellCount?: number;
  thumbnailList?: string;
  activeInd?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  productDocument?: IProductDocument;
  productDocumentId?: number;
  stockItemLists?: IStockItems[];
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
    public searchDetails?: any,
    public sellCount?: number,
    public thumbnailList?: string,
    public activeInd?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public productDocument?: IProductDocument,
    public productDocumentId?: number,
    public stockItemLists?: IStockItems[],
    public supplierName?: string,
    public supplierId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number,
    public productBrandName?: string,
    public productBrandId?: number
  ) {
    this.activeInd = this.activeInd || false;
    this.stockItemLists = this.stockItemLists || [];
    this.name = this.name || '';
    this.handle = this.handle || RootUtils.handleize(this.name);
  }
}
