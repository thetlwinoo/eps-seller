import { Moment } from 'moment';

export interface ISuppliers {
    id?: number;
    supplierName?: string;
    supplierReference?: string;
    bankAccountName?: string;
    bankAccountBranch?: string;
    bankAccountCode?: string;
    bankAccountNumber?: string;
    bankInternationalCode?: string;
    paymentDays?: number;
    internalComments?: string;
    phoneNumber?: string;
    faxNumber?: string;
    websiteURL?: string;
    webServiceUrl?: string;
    creditRating?: number;
    activeFlag?: boolean;
    avatarContentType?: string;
    avatar?: any;
    validFrom?: Moment;
    validTo?: Moment;
    primaryContactPersonFullName?: string;
    primaryContactPersonId?: number;
    alternateContactPersonFullName?: string;
    alternateContactPersonId?: number;
    supplierCategorySupplierCategoryName?: string;
    supplierCategoryId?: number;
    deliveryMethodDeliveryMethodName?: string;
    deliveryMethodId?: number;
    deliveryCityCityName?: string;
    deliveryCityId?: number;
    postalCityCityName?: string;
    postalCityId?: number;
    productAttributeListId?: number;
    productOptionListId?: number;
}

export class Suppliers implements ISuppliers {
    constructor(
        public id?: number,
        public supplierName?: string,
        public supplierReference?: string,
        public bankAccountName?: string,
        public bankAccountBranch?: string,
        public bankAccountCode?: string,
        public bankAccountNumber?: string,
        public bankInternationalCode?: string,
        public paymentDays?: number,
        public internalComments?: string,
        public phoneNumber?: string,
        public faxNumber?: string,
        public websiteURL?: string,
        public webServiceUrl?: string,
        public creditRating?: number,
        public activeFlag?: boolean,
        public avatarContentType?: string,
        public avatar?: any,
        public validFrom?: Moment,
        public validTo?: Moment,
        public primaryContactPersonFullName?: string,
        public primaryContactPersonId?: number,
        public alternateContactPersonFullName?: string,
        public alternateContactPersonId?: number,
        public supplierCategorySupplierCategoryName?: string,
        public supplierCategoryId?: number,
        public deliveryMethodDeliveryMethodName?: string,
        public deliveryMethodId?: number,
        public deliveryCityCityName?: string,
        public deliveryCityId?: number,
        public postalCityCityName?: string,
        public postalCityId?: number,
        public productAttributeListId?: number,
        public productOptionListId?: number
    ) {
        this.activeFlag = this.activeFlag || false;
    }
}
