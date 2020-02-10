import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@epm/constants';
import { createRequestOption } from '@epm/utils';
import { IPhotos } from '@epm/models';

type EntityResponseType = HttpResponse<IPhotos>;
type EntityArrayResponseType = HttpResponse<IPhotos[]>;

@Injectable({ providedIn: 'root' })
export class PhotosService {
    public resourceUrl = SERVER_API_URL + 'api/photos';
    public extendUrl = SERVER_API_URL + 'api/photos-extend';

    constructor(protected http: HttpClient) { }

    create(photos: IPhotos): Observable<EntityResponseType> {
        console.log('create photo', photos)
        return this.http.post<IPhotos>(this.resourceUrl, photos, { observe: 'response' });
    }

    update(photos: IPhotos): Observable<EntityResponseType> {
        return this.http.put<IPhotos>(this.resourceUrl, photos, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPhotos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhotos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deleteExtend(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.extendUrl}/photos/${id}`, { observe: 'response' });
    }

    createExtend(photos: IPhotos): Observable<EntityResponseType> {
        console.log('create photo', photos)
        return this.http.post<IPhotos>(this.extendUrl + '/photos', photos, { observe: 'response' });
    }

    updateExtend(photos: IPhotos): Observable<EntityResponseType> {
        return this.http.put<IPhotos>(this.extendUrl + '/photos', photos, { observe: 'response' });
    }
}