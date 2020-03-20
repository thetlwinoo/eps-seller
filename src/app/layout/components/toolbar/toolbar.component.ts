import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { AccountService, LoginService } from '@eps/core';
import { Observable, Subscription } from 'rxjs';
import { Account } from '@eps/core/user/account.model';
// import { Store, select } from '@ngrx/store';
import { RootConfigService } from '@eps/services';
// import { RootSidebarService } from '@eps/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
// import * as _ from 'lodash';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  account: Account;
  wishlistCount$: Observable<number>;
  compareCount$: Observable<number>;
  isCollapsed = true;

  rootConfig: any;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];

  isNavbarCollapsed = true;

  private unsubscribeAll: Subject<any>;
  private subscriptions: Subscription[] = [];
  constructor(
    private rootConfigService: RootConfigService,
    // private _rootSidebarService: RootSidebarService,
    // private _translateService: TranslateService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    // private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private platform: Platform
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (this.platform.ANDROID || this.platform.IOS) {
      this.isMobile = true;
    }

    const configSubscription = this.rootConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe(settings => {
      this.rootConfig = settings;
      this.horizontalNavbar = settings.layout.navbar.position === 'top';
      this.rightNavbar = settings.layout.navbar.position === 'right';
      this.hiddenNavbar = settings.layout.navbar.hidden === true;
    });
    this.subscriptions.push(configSubscription);
    this.accountService.identity().pipe(
      map(account => {
        this.account = account;
      })
    );
    this.registerAuthenticationSuccess();

    // Set the selected language from default languages
    // this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
  }

  registerAuthenticationSuccess(): void {
    const eventSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      console.log('message', message);
      this.accountService.identity().pipe(
        map(account => {
          this.account = account || null;
        })
      );
    });
    this.subscriptions.push(eventSubscription);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    // this.modalRef = this.loginModalService.open();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();

    this.subscriptions.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  toggleSidebarOpen(key): void {
    console.log('key', key);
    // this._rootSidebarService.getSidebar(key).toggleOpen();
  }

  setLanguage(lang): void {
    this.selectedLanguage = lang;
  }
}
