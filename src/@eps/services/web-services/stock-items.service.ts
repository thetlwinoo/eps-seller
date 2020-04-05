import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map, filter } from 'rxjs/operators';

import { SERVER_API_URL, DATE_FORMAT } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IStockItems, IPhotos, StockItems } from '@eps/models';

type EntityResponseType = HttpResponse<IStockItems>;
type EntityArrayResponseType = HttpResponse<IStockItems[]>;

@Injectable({ providedIn: 'root' })
export class StockItemsService {
  public resourceUrl = SERVER_API_URL + 'services/zezawar/api/stock-items';

  public extendUrl = SERVER_API_URL + 'services/zezawar/api/stock-items-extend';

  constructor(protected http: HttpClient) { }

  create(stockItems: IStockItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItems);
    console.log('check stock item', copy);
    return this.http
      .post<IStockItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(stockItems: IStockItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItems);
    return this.http
      .put<IStockItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStockItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStockItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPhoto(photos: IPhotos): Observable<EntityResponseType> {
    return this.http.post<IPhotos>(this.extendUrl + '/photos', photos, { observe: 'response' });
  }

  updatePhoto(photos: IPhotos): Observable<EntityResponseType> {
    return this.http.put<IPhotos>(this.extendUrl + '/photos', photos, { observe: 'response' });
  }

  findAll(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStockItems[]>(this.extendUrl + '/filter/vendor', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  loadCount(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.extendUrl + '/count', { observe: 'response' });
  }

  importStockItem(stockItems: IStockItems): Observable<IStockItems> {
    const copy = this.convertDateFromClient(stockItems);
    return this.http.post<IStockItems>(this.extendUrl + '/import', copy, { observe: 'response' })
      .pipe(
        filter((res: HttpResponse<StockItems>) => res.ok),
        map((res: HttpResponse<StockItems>) => res.body)
      );
  }

  protected convertDateFromClient(stockItems: IStockItems): IStockItems {
    const copy: IStockItems = Object.assign({}, stockItems, {
      sellStartDate: stockItems.sellStartDate && stockItems.sellStartDate.isValid() ? stockItems.sellStartDate.toJSON() : undefined,
      sellEndDate: stockItems.sellEndDate && stockItems.sellEndDate.isValid() ? stockItems.sellEndDate.toJSON() : undefined,
      lastEditedWhen: stockItems.lastEditedWhen && stockItems.lastEditedWhen.isValid() ? stockItems.lastEditedWhen.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sellStartDate = res.body.sellStartDate ? moment(res.body.sellStartDate) : undefined;
      res.body.sellEndDate = res.body.sellEndDate ? moment(res.body.sellEndDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stockItems: IStockItems) => {
        stockItems.sellStartDate = stockItems.sellStartDate ? moment(stockItems.sellStartDate) : undefined;
        stockItems.sellEndDate = stockItems.sellEndDate ? moment(stockItems.sellEndDate) : undefined;
        stockItems.lastEditedWhen = stockItems.lastEditedWhen ? moment(stockItems.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
