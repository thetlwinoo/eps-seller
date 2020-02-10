import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IProductModel } from '@eps/models';

type EntityResponseType = HttpResponse<IProductModel>;
type EntityArrayResponseType = HttpResponse<IProductModel[]>;

@Injectable({ providedIn: 'root' })
export class ProductModelService {
    public resourceUrl = SERVER_API_URL + 'api/product-models';

    constructor(protected http: HttpClient) { }

    create(productModel: IProductModel): Observable<EntityResponseType> {
        return this.http.post<IProductModel>(this.resourceUrl, productModel, { observe: 'response' });
    }

    update(productModel: IProductModel): Observable<EntityResponseType> {
        return this.http.put<IProductModel>(this.resourceUrl, productModel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductModel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
