export const enum Language {
    ENGLISH = 'ENGLISH',
    MYANMAR = 'MYANMAR'
}

export interface IProductModelDescription {
    id?: number;
    description?: string;
    language?: Language;
    productModelId?: number;
}

export class ProductModelDescription implements IProductModelDescription {
    constructor(public id?: number, public description?: string, public language?: Language, public productModelId?: number) {}
}
