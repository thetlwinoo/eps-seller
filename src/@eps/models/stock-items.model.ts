import { Moment } from 'moment';
import { IPhotos, IDangerousGoods, ISpecialDeals } from '@eps/models';

export interface IStockItems {
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
  photoLists?: IPhotos[];
  dangerousGoodLists?: IDangerousGoods[];
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
  materialName?: string;
  materialId?: number;
  currencyCode?: string;
  currencyId?: number;
  barcodeTypeName?: string;
  barcodeTypeId?: number;
  stockItemHoldingId?: number;
  productId?: number;
}

export class StockItems implements IStockItems {
  constructor(
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
    public photoLists?: IPhotos[],
    public dangerousGoodLists?: IDangerousGoods[],
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
    public productAttributeValue?: string,
    public productAttributeId?: number,
    public productOptionValue?: string,
    public productOptionId?: number,
    public materialName?: string,
    public materialId?: number,
    public currencyCode?: string,
    public currencyId?: number,
    public barcodeTypeName?: string,
    public barcodeTypeId?: number,
    public stockItemHoldingId?: number,
    public productId?: number
  ) {
    this.activeInd = this.activeInd || false;
  }
}
