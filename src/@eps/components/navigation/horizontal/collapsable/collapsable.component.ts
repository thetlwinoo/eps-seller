import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { rootAnimations } from '@eps/animations';
import { RootConfigService } from '@eps/services';

@Component({
  selector: 'root-nav-horizontal-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: rootAnimations,
})
export class RootNavHorizontalCollapsableComponent implements OnInit, OnDestroy {
  rootConfig: any;
  isOpen = false;

  @HostBinding('class')
  classes = 'nav-collapsable nav-item';

  @Input()
  item: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _rootConfigService: RootConfigService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._rootConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.rootConfig = config;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  @HostListener('mouseenter')
  open(): void {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  close(): void {
    this.isOpen = false;
  }
}
