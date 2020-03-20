import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootNavigationService } from '@eps/components/navigation/navigation.service';

@Component({
  selector: 'root-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootNavigationComponent implements OnInit {
  @Input()
  layout = 'vertical';

  @Input()
  navigation: any;

  collapsed = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _rootNavigationService: RootNavigationService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.navigation = this.navigation || this._rootNavigationService.getCurrentNavigation();

    this._rootNavigationService.onNavigationChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.navigation = this._rootNavigationService.getCurrentNavigation();

      this._changeDetectorRef.markForCheck();
    });

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
}
