import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IProductOption } from '@eps/models';

type EntityResponseType = HttpResponse<IProductOption>;
type EntityArrayResponseType = HttpResponse<IProductOption[]>;

@Injectable({ providedIn: 'root' })
export class ProductOptionService {
  public resourceUrl = SERVER_API_URL + 'services/zezawar/api/product-options';
  // public extendUrl = SERVER_API_URL + 'services/zezawar/api/product-option-extend';

  constructor(protected http: HttpClient) {}

  create(productOption: IProductOption): Observable<EntityResponseType> {
    return this.http.post<IProductOption>(this.resourceUrl, productOption, { observe: 'response' });
  }

  update(productOption: IProductOption): Observable<EntityResponseType> {
    return this.http.put<IProductOption>(this.resourceUrl, productOption, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductOption>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductOption[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  //   getAllProductOptions(optionSetId): Observable<EntityArrayResponseType> {
  //     let params = new HttpParams();

  //     if (optionSetId) {
  //       params = params.append('optionSetId', optionSetId);
  //     }

  //     return this.http.get<IProductOption[]>(this.extendUrl, { params, observe: 'response' });
  //   }
}
