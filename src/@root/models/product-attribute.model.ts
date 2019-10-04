export interface IProductAttribute {
    id?: number;
    value?: string;
    productAttributeSetName?: string;
    productAttributeSetId?: number;
}

export class ProductAttribute implements IProductAttribute {
    constructor(
        public id?: number,
        public value?: string,
        public productAttributeSetName?: string,
        public productAttributeSetId?: number
    ) {}
}
