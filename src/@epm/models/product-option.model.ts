export interface IProductOption {
    id?: number;
    productOptionValue?: string;
    productOptionSetProductOptionSetValue?: string;
    productOptionSetId?: number;
    supplierId?: number;
}

export class ProductOption implements IProductOption {
    constructor(
        public id?: number,
        public productOptionValue?: string,
        public productOptionSetProductOptionSetValue?: string,
        public productOptionSetId?: number,
        public supplierId?: number
    ) {}
}
