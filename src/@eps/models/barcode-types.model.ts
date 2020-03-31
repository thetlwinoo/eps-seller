export interface IBarcodeTypes {
  id?: number;
  barcodeTypeName?: string;
}

export class BarcodeTypes implements IBarcodeTypes {
  constructor(public id?: number, public barcodeTypeName?: string) {}
}
