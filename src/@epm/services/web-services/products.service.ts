import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT, SERVER_API_URL } from '@epm/constants';
import { map } from 'rxjs/operators';

import { createRequestOption } from '@epm/utils';
import { IProducts, Products, IStockItems, IPhotos } from '@epm/models';
import { StockItemsService, PhotosService } from '@epm/services';
import { filter } from 'rxjs/operators';
import { RootUtils } from '@epm/utils';

type EntityResponseType = HttpResponse<IProducts>;
type EntityArrayResponseType = HttpResponse<IProducts[]>;

@Injectable({ providedIn: 'root' })
export class ProductsService {
    public resourceUrl = SERVER_API_URL + 'api/products';
    public extendUrl = SERVER_API_URL + 'api/products-extend';
    public uploadUrl = SERVER_API_URL + 'api/excelupload';
    public importUrl = SERVER_API_URL + 'api/importtosystem';

    constructor(
        protected http: HttpClient,
        private stockItemsService: StockItemsService,
        private photosService: PhotosService,
    ) { }

    create(products: IProducts): Observable<EntityResponseType> {
        return this.http.post<IProducts>(this.resourceUrl, products, { observe: 'response' });
    }

    update(products: IProducts): Observable<EntityResponseType> {
        return this.http.put<IProducts>(this.resourceUrl, products, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProducts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProducts[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProducts[]>(this.extendUrl + '/search', { params: options, observe: 'response' });
    }

    searchAll(keyword: string): Observable<EntityArrayResponseType> {
        let params = new HttpParams();
        params = params.append('keyword', keyword);
        return this.http.get<IProducts[]>(this.extendUrl + '/searchall', { params: params, observe: 'response' });
    }

    getOne(id: number): Observable<EntityResponseType> {
        return this.http.get<IProducts>(`${this.extendUrl}/${id}`, { observe: 'response' });
    }

    createProducts(products: Products): Observable<EntityResponseType> {
        console.log('post products', products)
        return this.http.post<Products>(this.extendUrl + '/products', products, { observe: 'response' });
    }

    updateProducts(products: Products): Observable<EntityResponseType> {
        console.log('update products', products)
        return this.http.put<Products>(this.extendUrl + '/products', products, { observe: 'response' });
    }

    upload(file: any): Observable<any> {
        console.log('upload path', file);
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(this.uploadUrl, formData, { observe: 'response' }).pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        );
    }

    importToSystem(transactionId): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', transactionId);
        return this.http.post<any>(this.importUrl, params, { observe: 'response' }).pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        );
    }

    updateStockItemActive(stockItemId, isActive): Observable<EntityResponseType> {
        let params = new HttpParams();
        params = params.append('stockItemId', stockItemId);
        params = params.append('isActive', isActive);
        return this.http.put<Products>(this.extendUrl + '/products/stock-item', params, { observe: 'response' });
    }
    // saveProduct(product: IProducts): void {
    //     this.create(product)
    //         .pipe(
    //             filter((res: HttpResponse<IProducts>) => res.ok),
    //             map((res: HttpResponse<IProducts>) => res.body)
    //         )
    //         .subscribe(productSuccess => {
    //             console.log('product done', productSuccess);
    //             productSuccess.stockItemLists.map(stockItem => {

    //                 stockItem.productId = productSuccess.id;
    //                 stockItem.stockItemName = productSuccess.productName;

    //                 this.stockItemsService.create(stockItem)
    //                     .pipe(
    //                         filter((res: HttpResponse<IStockItems>) => res.ok),
    //                         map((res: HttpResponse<IStockItems>) => res.body)
    //                     )
    //                     .subscribe(stockItemSuccess => {
    //                         stockItemSuccess.thumbnailUrl = SERVER_API_URL + 'api/photos-extend?stockitem=' + stockItemSuccess.id;
    //                         console.log('stockItem done', stockItemSuccess);
    //                         this.stockItemsService.update(stockItemSuccess).pipe(
    //                             filter((res: HttpResponse<IStockItems>) => res.ok),
    //                             map((res: HttpResponse<IStockItems>) => res.body)
    //                         ).subscribe(result => {
    //                             console.log('update result', result);

    //                             stockItem.photoLists.filter(x => RootUtils.notEmpty(x.originalPhotoBlob)).map(photo => {
    //                                 photo.stockItemId = stockItemSuccess.id;
    //                                 this.photosService.create(photo)
    //                                     .pipe(
    //                                         filter((res: HttpResponse<IPhotos>) => res.ok),
    //                                         map((res: HttpResponse<IPhotos>) => res.body)
    //                                     ).subscribe(photoSuccess => console.log('photo done', photoSuccess))
    //                             })
    //                         })


    //                     })
    //             })
    //         })
    // }
}
