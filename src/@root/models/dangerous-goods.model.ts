export interface IDangerousGoods {
    id?: number;
    name?: string;
    stockItemId?: number;
}

export class DangerousGoods implements IDangerousGoods {
    constructor(public id?: number, public name?: string, public stockItemId?: number) {}
}
