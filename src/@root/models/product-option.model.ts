export interface IProductOption {
    id?: number;
    value?: string;
    productOptionSetValue?: string;
    productOptionSetId?: number;
}

export class ProductOption implements IProductOption {
    constructor(public id?: number, public value?: string, public productOptionSetValue?: string, public productOptionSetId?: number) { }
}
