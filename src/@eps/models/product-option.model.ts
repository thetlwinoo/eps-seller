export interface IProductOption {
  id?: number;
  value?: string;
  productOptionSetValue?: string;
  productOptionSetId?: number;
  supplierName?: string;
  supplierId?: number;
}

export class ProductOption implements IProductOption {
  constructor(
    public id?: number,
    public value?: string,
    public productOptionSetValue?: string,
    public productOptionSetId?: number,
    public supplierName?: string,
    public supplierId?: number
  ) {}
}
