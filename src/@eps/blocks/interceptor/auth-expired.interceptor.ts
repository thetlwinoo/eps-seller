import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService, StateStorageService } from '@eps/core';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private stateStorageService: StateStorageService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (err.status === 401 && err.url && !err.url.includes('api/account')) {
          console.log('interceptor login')
          this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
          this.authService.login();
        }
      })
    );
  }
}
