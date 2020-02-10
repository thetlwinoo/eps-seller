import { Moment } from 'moment';

export interface IStockItemTemp {
    id?: number;
    stockItemName?: string;
    vendorCode?: string;
    vendorSKU?: string;
    barcode?: string;
    barcodeTypeId?: number;
    barcodeTypeName?: string;
    productType?: string;
    productCategoryId?: number;
    productCategoryName?: string;
    productAttributeSetId?: number;
    productAttributeId?: number;
    productAttributeValue?: string;
    productOptionSetId?: number;
    productOptionId?: number;
    productOptionValue?: string;
    modelName?: string;
    modelNumber?: string;
    materialId?: number;
    materialName?: string;
    shortDescription?: any;
    description?: any;
    productBrandId?: number;
    productBrandName?: string;
    highlights?: any;
    searchDetails?: any;
    careInstructions?: any;
    dangerousGoods?: string;
    videoUrl?: string;
    unitPrice?: number;
    remommendedRetailPrice?: number;
    currencyCode?: string;
    quantityOnHand?: number;
    warrantyPeriod?: string;
    warrantyPolicy?: string;
    warrantyTypeId?: number;
    warrantyTypeName?: string;
    whatInTheBox?: any;
    itemLength?: number;
    itemWidth?: number;
    itemHeight?: number;
    itemWeight?: number;
    itemPackageLength?: number;
    itemPackageWidth?: number;
    itemPackageHeight?: number;
    itemPackageWeight?: number;
    itemLengthUnitMeasureId?: number;
    itemLengthUnitMeasureCode?: string;
    itemWidthUnitMeasureId?: number;
    itemWidthUnitMeasureCode?: string;
    itemHeightUnitMeasureId?: number;
    itemHeightUnitMeasureCode?: string;
    itemWeightUnitMeasureId?: number;
    itemWeightUnitMeasureCode?: string;
    itemPackageLengthUnitMeasureId?: number;
    itemPackageLengthUnitMeasureCode?: string;
    itemPackageWidthUnitMeasureId?: number;
    itemPackageWidthUnitMeasureCode?: string;
    itemPackageHeightUnitMeasureId?: number;
    itemPackageHeightUnitMeasureCode?: string;
    itemPackageWeightUnitMeasureId?: number;
    itemPackageWeightUnitMeasureCode?: string;
    noOfPieces?: number;
    noOfItems?: number;
    manufacture?: string;
    specialFeactures?: any;
    productComplianceCertificate?: string;
    genuineAndLegal?: boolean;
    countryOfOrigin?: string;
    usageAndSideEffects?: any;
    safetyWarnning?: any;
    sellStartDate?: Moment;
    sellEndDate?: Moment;
    status?: number;
    uploadTransactionId?: number;
}

export class StockItemTemp implements IStockItemTemp {
    constructor(
        public id?: number,
        public stockItemName?: string,
        public vendorCode?: string,
        public vendorSKU?: string,
        public barcode?: string,
        public barcodeTypeId?: number,
        public barcodeTypeName?: string,
        public productType?: string,
        public productCategoryId?: number,
        public productCategoryName?: string,
        public productAttributeSetId?: number,
        public productAttributeId?: number,
        public productAttributeValue?: string,
        public productOptionSetId?: number,
        public productOptionId?: number,
        public productOptionValue?: string,
        public modelName?: string,
        public modelNumber?: string,
        public materialId?: number,
        public materialName?: string,
        public shortDescription?: any,
        public description?: any,
        public productBrandId?: number,
        public productBrandName?: string,
        public highlights?: any,
        public searchDetails?: any,
        public careInstructions?: any,
        public dangerousGoods?: string,
        public videoUrl?: string,
        public unitPrice?: number,
        public remommendedRetailPrice?: number,
        public currencyCode?: string,
        public quantityOnHand?: number,
        public warrantyPeriod?: string,
        public warrantyPolicy?: string,
        public warrantyTypeId?: number,
        public warrantyTypeName?: string,
        public whatInTheBox?: any,
        public itemLength?: number,
        public itemWidth?: number,
        public itemHeight?: number,
        public itemWeight?: number,
        public itemPackageLength?: number,
        public itemPackageWidth?: number,
        public itemPackageHeight?: number,
        public itemPackageWeight?: number,
        public itemLengthUnitMeasureId?: number,
        public itemLengthUnitMeasureCode?: string,
        public itemWidthUnitMeasureId?: number,
        public itemWidthUnitMeasureCode?: string,
        public itemHeightUnitMeasureId?: number,
        public itemHeightUnitMeasureCode?: string,
        public itemWeightUnitMeasureId?: number,
        public itemWeightUnitMeasureCode?: string,
        public itemPackageLengthUnitMeasureId?: number,
        public itemPackageLengthUnitMeasureCode?: string,
        public itemPackageWidthUnitMeasureId?: number,
        public itemPackageWidthUnitMeasureCode?: string,
        public itemPackageHeightUnitMeasureId?: number,
        public itemPackageHeightUnitMeasureCode?: string,
        public itemPackageWeightUnitMeasureId?: number,
        public itemPackageWeightUnitMeasureCode?: string,
        public noOfPieces?: number,
        public noOfItems?: number,
        public manufacture?: string,
        public specialFeactures?: any,
        public productComplianceCertificate?: string,
        public genuineAndLegal?: boolean,
        public countryOfOrigin?: string,
        public usageAndSideEffects?: any,
        public safetyWarnning?: any,
        public sellStartDate?: Moment,
        public sellEndDate?: Moment,
        public status?: number,
        public uploadTransactionId?: number
    ) {
        this.genuineAndLegal = this.genuineAndLegal || false;
    }
}
