import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootNavigationItem } from '@eps/types';
import { RootNavigationService } from '@eps/components/navigation/navigation.service';

@Component({
  selector: 'root-nav-vertical-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class RootNavVerticalItemComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  classes = 'nav-item';

  @Input()
  item: RootNavigationItem;

  private _unsubscribeAll: Subject<any>;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _rootNavigationService: RootNavigationService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    merge(
      this._rootNavigationService.onNavigationItemAdded,
      this._rootNavigationService.onNavigationItemUpdated,
      this._rootNavigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
