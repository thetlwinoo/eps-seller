export interface IMerchants {
    id?: number;
    accountNumber?: string;
    merchantName?: string;
    creditRating?: number;
    activeFlag?: boolean;
    webServiceUrl?: string;
    webSiteUrl?: string;
    avatarContentType?: string;
    avatar?: any;
    personFullName?: string;
    personId?: number;
    productId?: number;
}

export class Merchants implements IMerchants {
    constructor(
        public id?: number,
        public accountNumber?: string,
        public merchantName?: string,
        public creditRating?: number,
        public activeFlag?: boolean,
        public webServiceUrl?: string,
        public webSiteUrl?: string,
        public avatarContentType?: string,
        public avatar?: any,
        public personFullName?: string,
        public personId?: number,
        public productId?: number
    ) {
        this.activeFlag = this.activeFlag || false;
    }
}
