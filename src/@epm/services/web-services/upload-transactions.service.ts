import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@epm/constants';
import { createRequestOption } from '@epm/utils';
import { IUploadTransactions } from '@epm/models';


type EntityResponseType = HttpResponse<IUploadTransactions>;
type EntityArrayResponseType = HttpResponse<IUploadTransactions[]>;

@Injectable({ providedIn: 'root' })
export class UploadTransactionsService {
    public resourceUrl = SERVER_API_URL + 'api/upload-transactions';
    public extendUrl = SERVER_API_URL + 'api/upload-transactions-extend';

    constructor(protected http: HttpClient) { }

    create(uploadTransactions: IUploadTransactions): Observable<EntityResponseType> {
        return this.http.post<IUploadTransactions>(this.resourceUrl, uploadTransactions, { observe: 'response' });
    }

    update(uploadTransactions: IUploadTransactions): Observable<EntityResponseType> {
        return this.http.put<IUploadTransactions>(this.resourceUrl, uploadTransactions, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUploadTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUploadTransactions[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deleteStockItemTemps(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.extendUrl}/${id}`, { observe: 'response' });
    }

    findAll(): Observable<EntityArrayResponseType> {
        return this.http.get<IUploadTransactions[]>(this.extendUrl, { observe: 'response' });
    }
}
