import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@root/constants';
import { createRequestOption } from '@root/utils';
import { IMerchants } from '@root/models';

type EntityResponseType = HttpResponse<IMerchants>;
type EntityArrayResponseType = HttpResponse<IMerchants[]>;

@Injectable({ providedIn: 'root' })
export class MerchantsService {
    public resourceUrl = SERVER_API_URL + 'api/merchants';
    public extendUrl = SERVER_API_URL + 'api/merchants-extend';

    constructor(protected http: HttpClient) {}

    create(merchants: IMerchants): Observable<EntityResponseType> {
        return this.http.post<IMerchants>(this.resourceUrl, merchants, { observe: 'response' });
    }

    update(merchants: IMerchants): Observable<EntityResponseType> {
        return this.http.put<IMerchants>(this.resourceUrl, merchants, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMerchants>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMerchants[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getOneByPrincipal(): Observable<EntityResponseType> {
        return this.http.get<IMerchants>(this.extendUrl + '/merchants/principal', { observe: 'response' });
    }
}
