import { IStockItems, StockItems, IProductAttribute, IProductOption } from '@eps/models';
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
  productDocumentId?: number;
  stockItemLists?: IStockItems[];
  supplierName?: string;
  supplierId?: number;
  productCategoryName?: string;
  productCategoryId?: number;
  productBrandName?: string;
  productBrandId?: number;
  productAttributeIds?: number[];
  productOptionIds?: number[];
  productAttributeList?: IProductAttribute[];
  productOptionList?: IProductOption[];
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
    public productDocumentId?: number,
    public stockItemLists?: IStockItems[],
    public supplierName?: string,
    public supplierId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number,
    public productBrandName?: string,
    public productBrandId?: number,
    public productAttributeIds?: number[],
    public productOptionIds?: number[],
    public productAttributeList?: IProductAttribute[],
    public productOptionList?: IProductOption[]
  ) {
    this.activeInd = this.activeInd || false;
    this.stockItemLists = stockItemLists ? stockItemLists : [];
    this.name = name || '';
    this.handle = handle || RootUtils.handleize(this.name);
    this.productAttributeIds = stockItemLists ? [...new Set(stockItemLists.map(item => item.productAttributeId))] : [];
    this.productOptionIds = stockItemLists ? [...new Set(stockItemLists.map(item => item.productOptionId))] : [];
    this.productAttributeList = productAttributeList ? productAttributeList : [];
    this.productOptionList = productOptionList ? productOptionList : [];
  }

  addAttribute(attribute: IProductAttribute): void {
    console.log('add attribute', attribute);
    const index = this.productAttributeList.indexOf(attribute);

    if (index < 0) {
      this.productAttributeList.push(attribute);
      this.addSync();
    }
  }

  removeAttribute(attribute): void {
    const index = this.productAttributeList.indexOf(attribute);

    if (index >= 0) {
      this.productAttributeList.splice(index, 1);
      this.stockItemLists = this.stockItemLists.filter(x => x.productAttributeId !== attribute.id);
    }
  }

  addOption(option: IProductOption): void {
    const index = this.productOptionList.indexOf(option);
    if (index < 0) {
      this.productOptionList.push(option);
      this.addSync();
    }
  }

  removeOption(option): void {
    const index = this.productOptionList.indexOf(option);

    if (index >= 0) {
      this.productOptionList.splice(index, 1);
      this.stockItemLists = this.stockItemLists.filter(x => x.productOptionId !== option.id);
    }
  }

  addSync(): void {
    this.productAttributeList.forEach(attribute => {
      this.productOptionList.forEach(option => {
        if (attribute && option) {
          const stockItem = new StockItems();
          stockItem.productAttributeId = attribute.id;
          stockItem.productAttributeValue = attribute.productAttributeValue;
          stockItem.productOptionId = option.id;
          stockItem.productOptionValue = option.productOptionValue;

          const item = this.stockItemLists
            ? this.stockItemLists.find(x => x.productAttributeId === attribute.id && x.productOptionId === option.id)
            : null;

          if (!item) {
            this.stockItemLists.push(stockItem);
          }
        }
      });
    });

    // this.stockItemLists = [...tempList, this.stockItemLists].filter(x => !_.isArray(x) && RootUtils.notEmpty(x));
  }
}
