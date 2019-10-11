export interface ISupplierImportedDocument {
    id?: number;
    importedTemplateContentType?: string;
    importedTemplate?: any;
    importedFailedTemplateContentType?: string;
    importedFailedTemplate?: any;
    uploadTransactionId?: number;
}

export class SupplierImportedDocument implements ISupplierImportedDocument {
    constructor(
        public id?: number,
        public importedTemplateContentType?: string,
        public importedTemplate?: any,
        public importedFailedTemplateContentType?: string,
        public importedFailedTemplate?: any,
        public uploadTransactionId?: number
    ) {}
}
