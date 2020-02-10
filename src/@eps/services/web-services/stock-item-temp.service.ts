import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { DATE_FORMAT, SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IStockItemTemp } from '@eps/models';

type EntityResponseType = HttpResponse<IStockItemTemp>;
type EntityArrayResponseType = HttpResponse<IStockItemTemp[]>;

@Injectable({ providedIn: 'root' })
export class StockItemTempService {
    public resourceUrl = SERVER_API_URL + 'api/stock-item-temps';
    public extendUrl = SERVER_API_URL + 'api/stock-item-temp-extend';

    constructor(protected http: HttpClient) { }

    create(stockItemTemp: IStockItemTemp): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stockItemTemp);
        return this.http
            .post<IStockItemTemp>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stockItemTemp: IStockItemTemp): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stockItemTemp);
        return this.http
            .put<IStockItemTemp>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStockItemTemp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStockItemTemp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getAllByTransactionId(page, size, id): Observable<EntityArrayResponseType> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('size', size);
        params = params.append('id', id);
        return this.http
            .get<IStockItemTemp[]>(this.extendUrl, { params: params, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(stockItemTemp: IStockItemTemp): IStockItemTemp {
        const copy: IStockItemTemp = Object.assign({}, stockItemTemp, {
            sellStartDate:
                stockItemTemp.sellStartDate != null && stockItemTemp.sellStartDate.isValid()
                    ? stockItemTemp.sellStartDate.format(DATE_FORMAT)
                    : null,
            sellEndDate:
                stockItemTemp.sellEndDate != null && stockItemTemp.sellEndDate.isValid()
                    ? stockItemTemp.sellEndDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.sellStartDate = res.body.sellStartDate != null ? moment(res.body.sellStartDate) : null;
            res.body.sellEndDate = res.body.sellEndDate != null ? moment(res.body.sellEndDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((stockItemTemp: IStockItemTemp) => {
                stockItemTemp.sellStartDate = stockItemTemp.sellStartDate != null ? moment(stockItemTemp.sellStartDate) : null;
                stockItemTemp.sellEndDate = stockItemTemp.sellEndDate != null ? moment(stockItemTemp.sellEndDate) : null;
            });
        }
        return res;
    }
}
