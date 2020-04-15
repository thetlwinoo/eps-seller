export interface IProductDocument {
  id?: number;
  videoUrl?: string;
  highlights?: any;
  longDescription?: any;
  shortDescription?: any;
  whatInTheBox?: any;
  careInstructions?: any;
  productType?: string;
  modelName?: string;
  modelNumber?: string;
  fabricType?: string;
  specialFeatures?: any;
  productComplianceCertificate?: string;
  genuineAndLegal?: boolean;
  countryOfOrigin?: string;
  usageAndSideEffects?: any;
  safetyWarnning?: any;
  warrantyPeriod?: string;
  warrantyPolicy?: string;
  warrantyTypeName?: string;
  warrantyTypeId?: number;
  cultureName?: string;
  cultureId?: number;
  productId?: number;
  dangerousGoods?: string;
}

export class ProductDocument implements IProductDocument {
  constructor(
    public id?: number,
    public videoUrl?: string,
    public highlights?: any,
    public longDescription?: any,
    public shortDescription?: any,
    public whatInTheBox?: any,
    public careInstructions?: any,
    public productType?: string,
    public modelName?: string,
    public modelNumber?: string,
    public fabricType?: string,
    public specialFeatures?: any,
    public productComplianceCertificate?: string,
    public genuineAndLegal?: boolean,
    public countryOfOrigin?: string,
    public usageAndSideEffects?: any,
    public safetyWarnning?: any,
    public warrantyPeriod?: string,
    public warrantyPolicy?: string,
    public warrantyTypeName?: string,
    public warrantyTypeId?: number,
    public cultureName?: string,
    public cultureId?: number,
    public productId?: number,
    public dangeroudGoods?: string
  ) {
    this.genuineAndLegal = this.genuineAndLegal || false;
  }
}
