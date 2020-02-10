import { Moment } from 'moment';

export interface IOrderLines {
    id?: number;
    carrierTrackingNumber?: string;
    quantity?: number;
    unitPrice?: number;
    unitPriceDiscount?: number;
    lineTotal?: number;
    taxRate?: number;
    pickedQuantity?: number;
    pickingCompletedWhen?: Moment;
    stockItemStockItemName?: string;
    stockItemId?: number;
    packageTypeId?: number;
    orderId?: number;
}

export class OrderLines implements IOrderLines {
    constructor(
        public id?: number,
        public carrierTrackingNumber?: string,
        public quantity?: number,
        public unitPrice?: number,
        public unitPriceDiscount?: number,
        public lineTotal?: number,
        public taxRate?: number,
        public pickedQuantity?: number,
        public pickingCompletedWhen?: Moment,
        public stockItemStockItemName?: string,
        public stockItemId?: number,
        public packageTypeId?: number,
        public orderId?: number
    ) {}
}
