export interface IUploadExcel {
  vendorCode?: string;
  vendorSKU?: string;
  barcode?: string;
  barcodeType?: string;
  itemName?: string;
  brandName?: string;
  productCategory?: string;
  productSubCategory?: string;
  productAttribute?: string;
  productOption?: string;
  shortDescription?: string;
  description?: string;
  modelName?: string;
  modelNumber?: string;
  quantityOnHand?: number;
  highlights?: string;
  searchKeywords?: string;
  genuineAndLegal?: boolean;
  warrantyType?: string;
  dangerousGoodsRegulations?: string;
  sellingPrice?: number;
  retailPrice?: number;
  itemLength?: number;
  itemLengthUnit?: string;
  itemWidth?: number;
  itemWidthUnit?: string;
  itemHeight?: number;
  itemHeightUnit?: string;
  itemWeight?: number;
  itemWeightUnit?: string;
  remark?: boolean;
}

export class UploadExcel implements IUploadExcel {
  constructor(data?) {
    console.log(data);
    data = data || {};
    data.vendorCode = data['Vendor Code'];
    data.vendorSKU = data['Vendor SKU'];
    data.barcode = data.Barcode;
    data.barcodeType = data['Barcode Type'];
    data.itemName = data['Item Name'];
    data.brandName = data['Brand Name'];
    data.productCategory = data['Product Cateogory'];
    data.productSubCategory = data['Product Sub Category'];
    data.productAttribute = data['Product Attribute'];
    data.productOption = data['Product Option'];
    data.shortDescription = data['Short Descriptions'];
    data.description = data.Description;
    data.modelName = data['Model Name'];
    data.modelNumber = data['Model Number'];
    data.quantityOnHand = data['Quantity On Hand'];
    data.highlights = data.Highlights;
    data.searchKeywords = data['Search Keywords'];
    data.genuineAndLegal = data['Genuine And Legal'];
    data.warrantyType = data['Warrenty Type'];
    data.dangerousGoodsRegulations = data['Dangerous Goods Regulations'];
    data.sellingPrice = data['Selling Price'];
    data.retailPrice = data['Retail Price'];
    data.itemLength = data['Item Length'];
    data.itemLengthUnit = data['Item Length Unit'];
    data.itemWidth = data['Item Width Unit'];
    data.itemWidthUnit = data['Item Width Unit'];
    data.itemHeight = data['Item Height'];
    data.itemHeightUnit = data['Item Height Unit'];
    data.itemWeight = data['Item Weight'];
    data.itemWeightUnit = data['Item Weight Unit'];
    data.remark = data.Remark;
    // this.genuineAndLegal = this.genuineAndLegal || false;
    // this.sellingPrice = this.sellingPrice || 0.0;
    // this.retailPrice = this.retailPrice || 0.0;
    // this.itemLength = this.itemLength || 0;
    // this.itemWidth = this.itemWidth || 0;
    // this.itemHeight = this.itemHeight || 0;
    // this.itemWeight = this.itemWeight || 0;
    // this.remark = this.remark || false;
  }
}
