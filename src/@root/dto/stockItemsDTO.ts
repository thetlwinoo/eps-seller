import { Moment } from 'moment';
import * as moment from 'moment';
import { Photos, SpecialDeals } from '@root/models';
import { RootUtils } from '@root/utils';
import { PhotosDTO } from './photosDTO';

export class StockItemsDTO {
    id: number;
    guid: string;
    stockItemName: string;
    sellerSKU: string;
    generatedSKU: string;
    barcode: string;
    unitPrice: number;
    recommendedRetailPrice: number;
    quantityPerOuter: number;
    typicalWeightPerUnit: number;
    typicalLengthPerUnit: number;
    typicalWidthPerUnit: number;
    typicalHeightPerUnit: number;
    marketingComments: string;
    internalComments: string;
    sellStartDate: Moment;
    sellEndDate: Moment;
    sellCount: number;
    customFields: string;
    thumbnailUrl: string;
    photoLists?: Photos[];
    specialDiscounts: SpecialDeals[];
    lengthUnitMeasureCode: any;
    weightUnitMeasureCode: any;
    widthUnitMeasureCode: any;
    heightUnitMeasureCode: any;
    productAttribute: any;
    productOption: any;
    stockItemHolding: any;
    product: any;

    constructor(stockItem?) {
        stockItem = stockItem || {};
        this.id = stockItem.id || null;
        this.guid = stockItem.id || RootUtils.generateGUID();
        this.stockItemName = stockItem.stockItemName || '';
        this.sellerSKU = stockItem.sellerSKU || '';
        this.generatedSKU = stockItem.generatedSKU || '';
        this.barcode = stockItem.barcode || '';
        this.unitPrice = stockItem.unitPrice || '';
        this.recommendedRetailPrice = stockItem.recommendedRetailPrice || '';
        this.quantityPerOuter = stockItem.quantityPerOuter || '';
        this.typicalWeightPerUnit = stockItem.typicalWeightPerUnit || '';
        this.typicalLengthPerUnit = stockItem.typicalLengthPerUnit || '';
        this.typicalWidthPerUnit = stockItem.typicalWidthPerUnit || '';
        this.typicalHeightPerUnit = stockItem.typicalHeightPerUnit || '';
        this.marketingComments = stockItem.marketingComments || '';
        this.internalComments = stockItem.internalComments || '';
        this.sellStartDate = stockItem.sellStartDate || null;
        this.sellEndDate = stockItem.sellEndDate || null;
        this.sellCount = stockItem.sellCount || 0;
        this.customFields = stockItem.customFields || '';
        this.thumbnailUrl = stockItem.thumbnailUrl || '';
        this.photoLists = stockItem.photoLists || [];
        this.specialDiscounts = stockItem.specialDiscounts || null;
        this.lengthUnitMeasureCode = stockItem.lengthUnitMeasureCode || null;
        this.weightUnitMeasureCode = stockItem.weightUnitMeasureCode || null;
        this.widthUnitMeasureCode = stockItem.widthUnitMeasureCode || null;
        this.heightUnitMeasureCode = stockItem.heightUnitMeasureCode || null;
        this.productAttribute = stockItem.productAttribute || null;
        this.productOption = stockItem.productOption || null;
        this.stockItemHolding = stockItem.stockItemHolding || null;
        this.product = stockItem.product || null;

        console.log('stockItem.photoLists',stockItem.photoLists)
        if (this.photoLists.length) {
            const tempPhotoList: PhotosDTO[] = [];
            this.photoLists.map(photo => {
                tempPhotoList.push(new PhotosDTO(photo));
            });
            const _length = this.photoLists.length;
            for (var _i = 0; _i < (8 - _length); _i++) {
                const IPhotos = new PhotosDTO();
                tempPhotoList.push(IPhotos);
            }
            this.photoLists = tempPhotoList;
        } else {
            this.photoLists = [];
            for (var _i = 0; _i < 8; _i++) {
                const IPhotos = new PhotosDTO();
                this.photoLists.push(IPhotos);
            }
        }
    }
}