import { IStockItemTemp, ISupplierImportedDocument } from '@epm/models';

export interface IUploadTransactions {
    id?: number;
    fileName?: string;
    templateUrl?: string;
    status?: number;
    generatedCode?: string;
    importDocumentLists?: ISupplierImportedDocument[];
    stockItemTempLists?: IStockItemTemp[];
    supplierSupplierName?: string;
    supplierId?: number;
    actionTypeActionTypeName?: string;
    actionTypeId?: number;
}

export class UploadTransactions implements IUploadTransactions {
    constructor(
        public id?: number,
        public fileName?: string,
        public templateUrl?: string,
        public status?: number,
        public generatedCode?: string,
        public importDocumentLists?: ISupplierImportedDocument[],
        public stockItemTempLists?: IStockItemTemp[],
        public supplierSupplierName?: string,
        public supplierId?: number,
        public actionTypeActionTypeName?: string,
        public actionTypeId?: number
    ) {}
}
