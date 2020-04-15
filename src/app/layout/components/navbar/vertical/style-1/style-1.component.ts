import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootConfigService } from '@eps/services';
import { Subject } from 'rxjs';
import { AccountService } from '@eps/core';
import { takeUntil, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { SupplierActions } from 'app/ngrx/auth/actions';
import { Account } from '@eps/core/user/account.model';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
  rootConfig: any;
  account: Account;
  private unsubscribeAll: Subject<any>;
  constructor(private rootConfigService: RootConfigService, private accountService: AccountService, private store: Store<fromAuth.State>) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.rootConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe(config => {
      this.rootConfig = config;
    });

    this.accountService.identity().subscribe(account => {
      this.account = account;
      this.store.dispatch(SupplierActions.getLoginSupplier());
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
