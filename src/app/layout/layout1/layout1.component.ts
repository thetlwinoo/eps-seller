import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootConfigService } from '@eps/services';
import { Platform } from '@angular/cdk/platform';
import { AccountService, LoginService } from '@eps/services/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '@eps/services';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit, OnDestroy {
  crumbs$: Observable<MenuItem[]>;
  home: MenuItem;
  rootConfig: any;
  pageTitle: string;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _rootConfigService: RootConfigService,
    private _platform: Platform,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,    
    private breadcrumb: BreadcrumbService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._rootConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.rootConfig = config;
      });

    this.crumbs$ = this.breadcrumb.crumbs$;
    this.home = { icon: 'pi pi-home', routerLink: ['/home'] };    
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/pages/auth/login']);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
