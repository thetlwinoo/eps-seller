import { Moment } from 'moment';
import { IOrders, IShoppingCarts } from '@eps/models';

export interface ISpecialDeals {
    id?: number;
    dealDescription?: string;
    startDate?: Moment;
    endDate?: Moment;
    discountAmount?: number;
    discountPercentage?: number;
    discountCode?: string;
    unitPrice?: number;
    cartDiscounts?: IShoppingCarts[];
    orderDiscounts?: IOrders[];
    buyingGroupBuyingGroupName?: string;
    buyingGroupId?: number;
    customerCategoryCustomerCategoryName?: string;
    customerCategoryId?: number;
    customerId?: number;
    productCategoryName?: string;
    productCategoryId?: number;
    stockItemId?: number;
}

export class SpecialDeals implements ISpecialDeals {
    constructor(
        public id?: number,
        public dealDescription?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public discountAmount?: number,
        public discountPercentage?: number,
        public discountCode?: string,
        public unitPrice?: number,
        public cartDiscounts?: IShoppingCarts[],
        public orderDiscounts?: IOrders[],
        public buyingGroupBuyingGroupName?: string,
        public buyingGroupId?: number,
        public customerCategoryCustomerCategoryName?: string,
        public customerCategoryId?: number,
        public customerId?: number,
        public productCategoryName?: string,
        public productCategoryId?: number,
        public stockItemId?: number
    ) {}
}
