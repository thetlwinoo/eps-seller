import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private crumbs: ReplaySubject<MenuItem[]>; // <-- Change to ReplaySubject
    crumbs$: Observable<MenuItem[]>;
  
    constructor() {
      this.crumbs = new ReplaySubject<MenuItem[]>();
      this.crumbs$ = this.crumbs.asObservable();
    }
  
    setCrumbs(items: MenuItem[]) {
      this.crumbs.next(
        (items || []).map(item =>
            Object.assign({}, item, {
              routerLinkActiveOptions: { exact: true }
            })
          )
      );
    }
  }