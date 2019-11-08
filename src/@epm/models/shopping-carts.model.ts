import { IShoppingCartItems } from '@epm/models';

export interface IShoppingCarts {
    id?: number;
    totalPrice?: number;
    totalCargoPrice?: number;
    specialDealsId?: number;
    cartUserId?: number;
    cartItemLists?: IShoppingCartItems[];
    customerId?: number;
}

export class ShoppingCarts implements IShoppingCarts {
    constructor(
        public id?: number,
        public totalPrice?: number,
        public totalCargoPrice?: number,
        public specialDealsId?: number,
        public cartUserId?: number,
        public cartItemLists?: IShoppingCartItems[],
        public customerId?: number
    ) {}
}
