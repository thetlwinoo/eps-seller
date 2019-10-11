import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@root/constants';
import { createRequestOption } from '@root/utils';
import { IProductAttribute } from '@root/models';

type EntityResponseType = HttpResponse<IProductAttribute>;
type EntityArrayResponseType = HttpResponse<IProductAttribute[]>;

@Injectable({ providedIn: 'root' })
export class ProductAttributeService {
    public resourceUrl = SERVER_API_URL + 'api/product-attributes';
    public extendUrl = SERVER_API_URL + 'api/product-attribute-extend';

    constructor(protected http: HttpClient) { }

    create(productAttribute: IProductAttribute): Observable<EntityResponseType> {
        return this.http.post<IProductAttribute>(this.resourceUrl, productAttribute, { observe: 'response' });
    }

    update(productAttribute: IProductAttribute): Observable<EntityResponseType> {
        return this.http.put<IProductAttribute>(this.resourceUrl, productAttribute, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductAttribute>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        console.log('req optinos', options)
        return this.http.get<IProductAttribute[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getAllProductAttributes(attributeSetId): Observable<EntityArrayResponseType> {
        let params = new HttpParams();
        if (attributeSetId) {
            params = params.append('attributeSetId', attributeSetId);
        }

        return this.http.get<IProductAttribute[]>(this.extendUrl, { params: params, observe: 'response' });
    }

}
