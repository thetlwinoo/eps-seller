export interface IProductAttribute {
    id?: number;
    productAttributeValue?: string;
    productAttributeSetProductAttributeSetName?: string;
    productAttributeSetId?: number;
    supplierId?: number;
}

export class ProductAttribute implements IProductAttribute {
    constructor(
        public id?: number,
        public productAttributeValue?: string,
        public productAttributeSetProductAttributeSetName?: string,
        public productAttributeSetId?: number,
        public supplierId?: number
    ) {}
}
