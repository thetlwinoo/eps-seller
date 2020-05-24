export interface IProductTags {
  id?: number;
  name?: string;
  productName?: string;
  productId?: number;
}

export class ProductTags implements IProductTags {
  constructor(public id?: number, public name?: string, public productName?: string, public productId?: number) {}
}
