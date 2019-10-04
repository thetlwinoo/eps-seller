import { RootUtils } from '@root/utils';
import * as moment from 'moment';
import { Moment } from 'moment';
import { StockItems, Photos } from '@root/models';
import { StockItemsDTO } from '@root/dto';

export class ProductsDTO {
    id: number;
    guid: string;
    merchant: any;
    outerPackage: any;
    productBrand: any;
    productCategory: any;
    productModel: any;
    productName: string;
    productNumber: string;
    searchDetails: string;
    sellCount: number;
    stockItemLists: any[];
    supplier: any;
    thumbnailUrl: string;
    unitPackage: any;
    warrantyPeriod: string;
    warrantyPolicy: string;
    warrantyType: any;
    whatInTheBox: string;
    createdBy: string;
    createdDate: Moment;
    lastModifiedBy: string;
    ModifiedDate: Moment;
    productAttributeList: any[];
    productOptionList: any[];

    constructor(product?) {
        product = product || {};
        this.id = product.id || null;
        this.guid = product.id || RootUtils.generateGUID();
        this.merchant = product.merchant || null;
        this.outerPackage = product.outerPackage || null;
        this.productBrand = product.productBrand || null;
        this.productCategory = product.productCategory || null;
        this.productModel = product.productModel || null;
        this.productName = product.productName || '';
        this.productNumber = product.productNumber || '';
        this.searchDetails = product.searchDetails || '';
        this.sellCount = product.sellCount || 0;
        this.stockItemLists = product.stockItemLists || [];
        this.supplier = product.supplier || null;
        this.thumbnailUrl = product.thumbnailUrl || '';
        this.unitPackage = product.unitPackage || null;
        this.warrantyPeriod = product.warrantyPeriod || '';
        this.warrantyPolicy = product.warrantyPolicy || '';
        this.warrantyType = product.warrantyType || null;
        this.whatInTheBox = product.whatInTheBox || '';
        this.createdBy = product.createdBy || '';
        this.createdDate = moment(product.createdDate) || null;
        this.lastModifiedBy = product.lastModifiedBy || '';
        this.ModifiedDate = moment(product.ModifiedDate) || null;
        this.productAttributeList = product.stockItemLists ? RootUtils.getUnique([...new Set(product.stockItemLists.map(item => item.productAttribute))], 'id') : [];
        this.productOptionList = product.stockItemLists ? RootUtils.getUnique([...new Set(product.stockItemLists.map(item => item.productOption))], 'id') : [];

        const tempStockItemList: StockItemsDTO[] = [];
        this.stockItemLists.forEach(stockItem => {
            tempStockItemList.push(new StockItemsDTO(stockItem));
            // stockItem.guid = stockItem.id || RootUtils.generateGUID();
            // if (stockItem.photoLists.length) {
            //     const _length = stockItem.photoLists.length;
            //     for (var _i = 0; _i < (8 - _length); _i++) {
            //         stockItem.photoLists.push(new Photos());
            //     }
            // } else {
            //     for (var _i = 0; _i < 8; _i++) {
            //         const _photos = new Photos();
            //         stockItem.photoLists.push(_photos);
            //     }
            // }
        });
        this.stockItemLists = tempStockItemList;
    }

    public addAttribute(attribute: any): void {
        console.log('attribute',attribute);
        const index = this.productAttributeList.indexOf(attribute);

        if (index < 0) {
            this.productAttributeList.push(attribute);
            this.addSync();
        }
    }

    public removeAttribute(attribute): void {
        const index = this.productAttributeList.indexOf(attribute);

        if (index >= 0) {
            this.productAttributeList.splice(index, 1);
            this.stockItemLists = this.stockItemLists.filter(x => x.productAttribute.id !== attribute.id);
        }
    }

    addOption(option: any): void {
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
            this.stockItemLists = this.stockItemLists.filter(x => x.productOption.id !== option.id);
        }
    }

    addSync() {
        this.productAttributeList.forEach(attribute => {
            this.productOptionList.forEach(option => {
                if (attribute && option) {
                    const stockItem = new StockItemsDTO();
                    stockItem.productAttribute = attribute;
                    stockItem.productOption = option;

                    const item = this.stockItemLists ? this.stockItemLists.find(x => x.productAttribute.id == attribute.id && x.productOption.id == option.id) : null;

                    if (!item) {
                        this.stockItemLists.push(stockItem);
                    }
                }

            })
        });

    }
}