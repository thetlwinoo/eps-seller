import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
// import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootMatchMediaService } from '@eps/services';
import { RootMatSidenavHelperService } from '@eps/directives/root-mat-sidenav/root-mat-sidenav.service';

@Directive({
    selector: '[rootMatSidenavHelper]'
})
export class RootMatSidenavHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input()
    rootMatSidenavHelper: string;

    @Input()
    matIsLockedOpen: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RootMatchMediaService} _rootMatchMediaService
     * @param {RootMatSidenavHelperService} _rootMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    constructor(
        private _rootMatchMediaService: RootMatchMediaService,
        private _rootMatSidenavHelperService: RootMatSidenavHelperService,
        // private _matSidenav: MatSidenav,
        private _mediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Register the sidenav to the service
        // this._rootMatSidenavHelperService.setSidenav(this.rootMatSidenavHelper, this._matSidenav);

        if ( this._mediaObserver.isActive(this.matIsLockedOpen) )
        {
            this.isLockedOpen = true;
            // this._matSidenav.mode = 'side';
            // this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            // this._matSidenav.mode = 'over';
            // this._matSidenav.toggle(false);
        }

        this._rootMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this._mediaObserver.isActive(this.matIsLockedOpen) )
                {
                    this.isLockedOpen = true;
                    // this._matSidenav.mode = 'side';
                    // this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    // this._matSidenav.mode = 'over';
                    // this._matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[rootMatSidenavToggler]'
})
export class RootMatSidenavTogglerDirective
{
    @Input()
    rootMatSidenavToggler: string;

    /**
     * Constructor
     *
     * @param {RootMatSidenavHelperService} _rootMatSidenavHelperService
     */
    constructor(
        private _rootMatSidenavHelperService: RootMatSidenavHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick(): void
    {
        this._rootMatSidenavHelperService.getSidenav(this.rootMatSidenavToggler).toggle();
    }
}
