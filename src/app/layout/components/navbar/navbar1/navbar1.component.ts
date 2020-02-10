import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RootConfigService } from '@eps/services';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Navbar1Component implements OnInit, OnDestroy {

  rootConfig: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _rootConfigService: RootConfigService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._rootConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.rootConfig = config;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
