import { Moment } from 'moment';
import { IPhotos, ISpecialDeals, IMaterials, ICurrency } from '@eps/models';
import { RootUtils } from '@eps/utils';
import { IProductAttribute } from './product-attribute.model';
import { IProductOption } from './product-option.model';
import { IBarcodeTypes } from './barcode-types.model';

export interface IStockItems {
  guid?: string;
  id?: number;
  name?: string;
  vendorCode?: string;
  vendorSKU?: string;
  generatedSKU?: string;
  barcode?: string;
  unitPrice?: number;
  recommendedRetailPrice?: number;
  quantityOnHand?: number;
  itemLength?: number;
  itemWidth?: number;
  itemHeight?: number;
  itemWeight?: number;
  itemPackageLength?: number;
  itemPackageWidth?: number;
  itemPackageHeight?: number;
  itemPackageWeight?: number;
  noOfPieces?: number;
  noOfItems?: number;
  manufacture?: string;
  marketingComments?: string;
  internalComments?: string;
  sellStartDate?: Moment;
  sellEndDate?: Moment;
  sellCount?: number;
  customFields?: string;
  thumbnailUrl?: string;
  activeInd?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  stockItemOnReviewLineId?: number;
  photoLists?: any[];
  photosCount?: number;
  specialDiscounts?: ISpecialDeals[];
  itemLengthUnitCode?: string;
  itemLengthUnitId?: number;
  itemWidthUnitCode?: string;
  itemWidthUnitId?: number;
  itemHeightUnitCode?: string;
  itemHeightUnitId?: number;
  packageLengthUnitCode?: string;
  packageLengthUnitId?: number;
  packageWidthUnitCode?: string;
  packageWidthUnitId?: number;
  packageHeightUnitCode?: string;
  packageHeightUnitId?: number;
  itemPackageWeightUnitCode?: string;
  itemPackageWeightUnitId?: number;
  productAttributeValue?: string;
  productAttributeId?: number;
  productOptionValue?: string;
  productOptionId?: number;
  material?: IMaterials;
  materialName?: string;
  materialId?: number;
  currency?: ICurrency;
  currencyCode?: string;
  currencyId?: number;
  barcodeType?: IBarcodeTypes;
  barcodeTypeName?: string;
  barcodeTypeId?: number;
  stockItemHoldingId?: number;
  productId?: number;
}

export class StockItems implements IStockItems {
  constructor(
    public guid?: string,
    public id?: number,
    public name?: string,
    public vendorCode?: string,
    public vendorSKU?: string,
    public generatedSKU?: string,
    public barcode?: string,
    public unitPrice?: number,
    public recommendedRetailPrice?: number,
    public quantityOnHand?: number,
    public itemLength?: number,
    public itemWidth?: number,
    public itemHeight?: number,
    public itemWeight?: number,
    public itemPackageLength?: number,
    public itemPackageWidth?: number,
    public itemPackageHeight?: number,
    public itemPackageWeight?: number,
    public noOfPieces?: number,
    public noOfItems?: number,
    public manufacture?: string,
    public marketingComments?: string,
    public internalComments?: string,
    public sellStartDate?: Moment,
    public sellEndDate?: Moment,
    public sellCount?: number,
    public customFields?: string,
    public thumbnailUrl?: string,
    public activeInd?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public stockItemOnReviewLineId?: number,
    public photoLists?: any[],
    public photosCount?: number,
    public specialDiscounts?: ISpecialDeals[],
    public itemLengthUnitCode?: string,
    public itemLengthUnitId?: number,
    public itemWidthUnitCode?: string,
    public itemWidthUnitId?: number,
    public itemHeightUnitCode?: string,
    public itemHeightUnitId?: number,
    public packageLengthUnitCode?: string,
    public packageLengthUnitId?: number,
    public packageWidthUnitCode?: string,
    public packageWidthUnitId?: number,
    public packageHeightUnitCode?: string,
    public packageHeightUnitId?: number,
    public itemPackageWeightUnitCode?: string,
    public itemPackageWeightUnitId?: number,
    public productAttribute?: IProductAttribute,
    public productAttributeValue?: string,
    public productAttributeId?: number,
    public productOption?: IProductOption,
    public productOptionValue?: string,
    public productOptionId?: number,
    public material?: IMaterials,
    public materialName?: string,
    public materialId?: number,
    public currency?: ICurrency,
    public currencyCode?: string,
    public currencyId?: number,
    public barcodeType?: IBarcodeTypes,
    public barcodeTypeName?: string,
    public barcodeTypeId?: number,
    public stockItemHoldingId?: number,
    public productId?: number
  ) {
    this.activeInd = this.activeInd || false;
    this.guid = RootUtils.generateGUID();
    this.photosCount = 0;
  }
}
