export interface IWarrantyTypes {
    id?: number;
    warrantyTypeName?: string;
}

export class WarrantyTypes implements IWarrantyTypes {
    constructor(public id?: number, public warrantyTypeName?: string) {}
}
