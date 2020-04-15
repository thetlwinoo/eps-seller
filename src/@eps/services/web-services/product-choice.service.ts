import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IProductChoice } from '@eps/models';

type EntityResponseType = HttpResponse<IProductChoice>;
type EntityArrayResponseType = HttpResponse<IProductChoice[]>;

@Injectable({ providedIn: 'root' })
export class ProductChoiceService {
  public resourceUrl = SERVER_API_URL + 'services/zezawar/api/product-choices';
  //   public extendUrl = SERVER_API_URL + 'services/zezawar/api/product-choices-extend';

  constructor(protected http: HttpClient) {}

  create(productChoice: IProductChoice): Observable<EntityResponseType> {
    return this.http.post<IProductChoice>(this.resourceUrl, productChoice, { observe: 'response' });
  }

  update(productChoice: IProductChoice): Observable<EntityResponseType> {
    return this.http.put<IProductChoice>(this.resourceUrl, productChoice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductChoice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductChoice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  //   getAllProductChoice(categoryId): Observable<EntityArrayResponseType> {
  //     let params = new HttpParams();
  //     params = params.append('categoryId', categoryId);
  //     console.log('fetch choice', this.extendUrl, params);
  //     return this.http.get<IProductChoice[]>(this.extendUrl, { params, observe: 'response' });
  //   }
}
