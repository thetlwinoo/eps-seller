export interface IProductCategory {
    id?: number;
    name?: string;
    parentId?: number;
    photoContentType?: string;
    photo?: any;
}

export class ProductCategory implements IProductCategory {
    constructor(public id?: number, public name?: string, public parentId?: number, public photoContentType?: string, public photo?: any) {}
}
