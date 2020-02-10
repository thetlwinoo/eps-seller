export interface IProductBrand {
    id?: number;
    productBrandName?: string;
    photoContentType?: string;
    photo?: any;
    merchantMerchantName?: string;
    merchantId?: number;
}

export class ProductBrand implements IProductBrand {
    constructor(
        public id?: number,
        public productBrandName?: string,
        public photoContentType?: string,
        public photo?: any,
        public merchantMerchantName?: string,
        public merchantId?: number
    ) {}
}
