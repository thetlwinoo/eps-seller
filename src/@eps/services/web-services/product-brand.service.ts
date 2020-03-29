import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IProductBrand } from '@eps/models';

type EntityResponseType = HttpResponse<IProductBrand>;
type EntityArrayResponseType = HttpResponse<IProductBrand[]>;

@Injectable({ providedIn: 'root' })
export class ProductBrandService {
    public resourceUrl = SERVER_API_URL + 'services/zezawar/api/product-brands';

    constructor(protected http: HttpClient) {}

    create(productBrand: IProductBrand): Observable<EntityResponseType> {
        return this.http.post<IProductBrand>(this.resourceUrl, productBrand, { observe: 'response' });
    }

    update(productBrand: IProductBrand): Observable<EntityResponseType> {
        return this.http.put<IProductBrand>(this.resourceUrl, productBrand, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductBrand>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductBrand[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
