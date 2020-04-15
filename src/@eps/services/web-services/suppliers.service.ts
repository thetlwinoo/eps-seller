import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL, DATE_FORMAT } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { ISuppliers } from '@eps/models';

type EntityResponseType = HttpResponse<ISuppliers>;
type EntityArrayResponseType = HttpResponse<ISuppliers[]>;

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  public resourceUrl = SERVER_API_URL + 'services/zezawar/api/suppliers';
  public extendUrl = SERVER_API_URL + 'services/zezawar/api/suppliers-extend';

  constructor(protected http: HttpClient) {}

  create(suppliers: ISuppliers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(suppliers);
    return this.http
      .post<ISuppliers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(suppliers: ISuppliers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(suppliers);
    return this.http
      .put<ISuppliers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISuppliers>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISuppliers[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSupplierByPrincipal(): Observable<EntityResponseType> {
    return this.http.get<ISuppliers>(this.extendUrl + '/principal', { observe: 'response' });
  }

  protected convertDateFromClient(suppliers: ISuppliers): ISuppliers {
    const copy: ISuppliers = Object.assign({}, suppliers, {
      validFrom: suppliers.validFrom != null && suppliers.validFrom.isValid() ? suppliers.validFrom.format(DATE_FORMAT) : null,
      validTo: suppliers.validTo != null && suppliers.validTo.isValid() ? suppliers.validTo.format(DATE_FORMAT) : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom != null ? moment(res.body.validFrom) : null;
      res.body.validTo = res.body.validTo != null ? moment(res.body.validTo) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((suppliers: ISuppliers) => {
        suppliers.validFrom = suppliers.validFrom != null ? moment(suppliers.validFrom) : null;
        suppliers.validTo = suppliers.validTo != null ? moment(suppliers.validTo) : null;
      });
    }
    return res;
  }
}
