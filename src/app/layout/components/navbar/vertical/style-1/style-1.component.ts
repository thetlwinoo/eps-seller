import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RootConfigService } from '@root/services';
import { Subject } from 'rxjs';
import { AccountService } from '@root/services/core';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { Store, select } from "@ngrx/store";
import * as fromAuth from 'app/ngrx/auth/reducers';
import { MerchantActions } from 'app/ngrx/auth/actions';

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    rootConfig: any;
    account: Account;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _rootConfigService: RootConfigService,
        private accountService: AccountService,
        private store: Store<fromAuth.State>,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._rootConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.rootConfig = config;
            });

        this.accountService.identity().then((account: Account) => {
            this.account = account;
            console.log('accountttt', account)
            this.store.dispatch(MerchantActions.getLoginMerchant());
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
