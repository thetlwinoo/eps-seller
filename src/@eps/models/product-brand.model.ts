export interface IProductBrand {
  id?: number;
  name?: string;
  thumbnailUrl?: string;
}

export class ProductBrand implements IProductBrand {
  constructor(public id?: number, public name?: string, public thumbnailUrl?: string) {}
}
