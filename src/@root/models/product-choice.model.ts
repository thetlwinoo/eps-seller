export interface IProductChoice {
    id?: number;
    isMultiply?: boolean;
    productCategoryName?: string;
    productCategoryId?: number;
    productAttributeSetProductAttributeSetName?: string;
    productAttributeSetId?: number;
    productOptionSetProductOptionSetValue?: string;
    productOptionSetId?: number;
}

export class ProductChoice implements IProductChoice {
    constructor(
        public id?: number,
        public isMultiply?: boolean,
        public productCategoryName?: string,
        public productCategoryId?: number,
        public productAttributeSetProductAttributeSetName?: string,
        public productAttributeSetId?: number,
        public productOptionSetProductOptionSetValue?: string,
        public productOptionSetId?: number
    ) {
        this.isMultiply = this.isMultiply || false;
    }
}
