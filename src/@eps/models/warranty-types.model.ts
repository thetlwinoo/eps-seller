export interface IWarrantyTypes {
  id?: number;
  name?: string;
}

export class WarrantyTypes implements IWarrantyTypes {
  constructor(public id?: number, public name?: string) {}
}
