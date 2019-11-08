import { Moment } from 'moment';
import { IPhotos, IDangerousGoods, ISpecialDeals } from '@epm/models';

export interface IStockItems {
    id?: number;
    stockItemName?: string;
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
    stockItemOnReviewLineId?: number;
    photoLists?: IPhotos[];
    dangerousGoodLists?: IDangerousGoods[];
    specialDiscounts?: ISpecialDeals[];
    itemLengthUnitUnitMeasureCode?: string;
    itemLengthUnitId?: number;
    itemWidthUnitUnitMeasureCode?: string;
    itemWidthUnitId?: number;
    itemHeightUnitUnitMeasureCode?: string;
    itemHeightUnitId?: number;
    packageLengthUnitUnitMeasureCode?: string;
    packageLengthUnitId?: number;
    packageWidthUnitUnitMeasureCode?: string;
    packageWidthUnitId?: number;
    packageHeightUnitUnitMeasureCode?: string;
    packageHeightUnitId?: number;
    itemPackageWeightUnitUnitMeasureCode?: string;
    itemPackageWeightUnitId?: number;
    productAttributeProductAttributeValue?: string;
    productAttributeId?: number;
    productOptionProductOptionValue?: string;
    productOptionId?: number;
    materialMaterialName?: string;
    materialId?: number;
    currencyCurrencyCode?: string;
    currencyId?: number;
    barcodeTypeBarcodeTypeName?: string;
    barcodeTypeId?: number;
    stockItemHoldingId?: number;
    productId?: number;
}

export class StockItems implements IStockItems {
    constructor(
        public id?: number,
        public stockItemName?: string,
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
        public stockItemOnReviewLineId?: number,
        public photoLists?: IPhotos[],
        public dangerousGoodLists?: IDangerousGoods[],
        public specialDiscounts?: ISpecialDeals[],
        public itemLengthUnitUnitMeasureCode?: string,
        public itemLengthUnitId?: number,
        public itemWidthUnitUnitMeasureCode?: string,
        public itemWidthUnitId?: number,
        public itemHeightUnitUnitMeasureCode?: string,
        public itemHeightUnitId?: number,
        public packageLengthUnitUnitMeasureCode?: string,
        public packageLengthUnitId?: number,
        public packageWidthUnitUnitMeasureCode?: string,
        public packageWidthUnitId?: number,
        public packageHeightUnitUnitMeasureCode?: string,
        public packageHeightUnitId?: number,
        public itemPackageWeightUnitUnitMeasureCode?: string,
        public itemPackageWeightUnitId?: number,
        public productAttributeProductAttributeValue?: string,
        public productAttributeId?: number,
        public productOptionProductOptionValue?: string,
        public productOptionId?: number,
        public materialMaterialName?: string,
        public materialId?: number,
        public currencyCurrencyCode?: string,
        public currencyId?: number,
        public barcodeTypeBarcodeTypeName?: string,
        public barcodeTypeId?: number,
        public stockItemHoldingId?: number,
        public productId?: number
    ) {
        this.activeInd = this.activeInd || false;
    }
}
