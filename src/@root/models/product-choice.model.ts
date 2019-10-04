export interface IProductChoice {
    id?: number;
    isMultiply?: boolean;
    productCategoryName?: string;
    productCategoryId?: number;
    productAttributeSetName?: string;
    productAttributeSetId?: number;
    productOptionSetValue?: string;
    productOptionSetId?: number;
}

export class ProductChoice implements IProductChoice {
    constructor(
        public id?: number,
        public isMultiply?: boolean,
        public productCategoryName?: string,
        public productCategoryId?: number,
        public productAttributeSetName?: string,
        public productAttributeSetId?: number,
        public productOptionSetValue?: string,
        public productOptionSetId?: number
    ) {
        this.isMultiply = this.isMultiply || false;
    }
}
