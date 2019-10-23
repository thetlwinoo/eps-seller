import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootAlertService } from '@root/components/alert/alert.service';

@Component({
    selector: 'root-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RootAlertComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    mode: 'danger' | 'warning' | 'info' | 'success';
    message: string;
    visible: boolean;

    constructor(
        private rootAlertService: RootAlertService
    ) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.rootAlertService.mode
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mode) => {
                this.mode = mode;
            });

        this.rootAlertService.message
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.message = value;
            });

        this.rootAlertService.visible
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((visible) => {
                this.visible = visible;
            });

    }

    close(event) {
        this.rootAlertService.hide();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}