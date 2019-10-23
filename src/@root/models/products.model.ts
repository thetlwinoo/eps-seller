import { IStockItems, StockItems, IProductAttribute, IProductOption } from '@root/models';
import * as _ from 'lodash';
import { RootUtils } from '@root/utils';

export interface IProducts {
    id?: number;
    productName?: string;
    handle?: string;
    productNumber?: string;
    searchDetails?: any;
    sellCount?: number;
    activeInd?: boolean;
    documentId?: number;
    stockItemLists?: IStockItems[];
    supplierSupplierName?: string;
    supplierId?: number;
    productCategoryName?: string;
    productCategoryId?: number;
    productBrandProductBrandName?: string;
    productBrandId?: number;
    productAttributeIds?: number[];
    productOptionIds?: number[];
    productAttributeList?: IProductAttribute[];
    productOptionList?: IProductOption[];
}

export class Products implements IProducts {
    constructor(
        public id?: number,
        public productName?: string,
        public handle?: string,
        public productNumber?: string,
        public searchDetails?: any,
        public sellCount?: number,
        public activeInd?: boolean,
        public documentId?: number,
        public stockItemLists?: IStockItems[],
        public supplierSupplierName?: string,
        public supplierId?: number,
        public productCategoryName?: string,
        public productCategoryId?: number,
        public productBrandProductBrandName?: string,
        public productBrandId?: number,
        public productAttributeIds?: number[],
        public productOptionIds?: number[],
        public productAttributeList?: IProductAttribute[],
        public productOptionList?: IProductOption[],        
    ) {
        this.stockItemLists = stockItemLists ? stockItemLists : [];
        this.productName = productName || '';
        this.handle = handle || RootUtils.handleize(this.productName);
        this.productAttributeIds = stockItemLists ? [...new Set(stockItemLists.map(item => item.productAttributeId))] : [];
        this.productOptionIds = stockItemLists ? [...new Set(stockItemLists.map(item => item.productOptionId))] : [];
        this.productAttributeList = productAttributeList ? productAttributeList : [];
        this.productOptionList = productOptionList ? productOptionList : [];
    }

    addAttribute(attribute: IProductAttribute): void {
        console.log('add attribute',attribute)
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

    addSync() {
        this.productAttributeList.forEach(attribute => {
            this.productOptionList.forEach(option => {
                if (attribute && option) {
                    const stockItem = new StockItems();
                    stockItem.productAttributeId = attribute.id;
                    stockItem.productAttributeProductAttributeValue = attribute.productAttributeValue;
                    stockItem.productOptionId = option.id;
                    stockItem.productOptionProductOptionValue = option.productOptionValue;

                    const item = this.stockItemLists ? this.stockItemLists.find(x => x.productAttributeId == attribute.id && x.productOptionId == option.id) : null;

                    if (!item) {
                        this.stockItemLists.push(stockItem);
                    }
                }

            })
        });

        // this.stockItemLists = [...tempList, this.stockItemLists].filter(x => !_.isArray(x) && RootUtils.notEmpty(x));
    }


}
