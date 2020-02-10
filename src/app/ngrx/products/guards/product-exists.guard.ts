import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ProductsService } from '@eps/services';
import { ProductActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { IProducts } from '@eps/models';

@Injectable({
    providedIn: 'root',
})
export class ProductExistsGuard implements CanActivate {
    constructor(
        private store: Store<fromProducts.State>,
        private productsService: ProductsService,
        private router: Router
    ) { }

    hasProductInStore(id: number): Observable<boolean> {
        return this.store.pipe(
            select(fromProducts.getProductEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    hasProductInApi(id: number): Observable<boolean> {
        return this.productsService.find(id).pipe(
            filter((res: HttpResponse<IProducts>) => res.ok),
            map((res: HttpResponse<IProducts>) => res.body),
            map(productEntity => ProductActions.loadProduct({ product: productEntity })),
            tap(action => this.store.dispatch(action)),
            map(product => !!product),
            catchError(() => {
                this.router.navigate(['/404']);
                return of(false);
            })
        );
    }

    hasProduct(id: number): Observable<boolean> {
        return this.hasProductInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    console.log('instore')
                    return of(inStore);
                }

                return this.hasProductInApi(id);
            })
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.hasProduct(route.params['id']);
    }
}