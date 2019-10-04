export interface IShoppingCartItems {
    id?: number;
    quantity?: number;
    stockItemStockItemName?: string;
    stockItemId?: number;
    cartId?: number;
}

export class ShoppingCartItems implements IShoppingCartItems {
    constructor(
        public id?: number,
        public quantity?: number,
        public stockItemStockItemName?: string,
        public stockItemId?: number,
        public cartId?: number
    ) {}
}
