import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { RootNavigationItem } from '@eps/types';
import { rootAnimations } from '@eps/animations';
import { RootNavigationService } from '@eps/components/navigation/navigation.service';

@Component({
  selector: 'root-nav-vertical-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: rootAnimations,
})
export class RootNavVerticalCollapsableComponent implements OnInit, OnDestroy {
  @Input()
  item: RootNavigationItem;

  @HostBinding('class')
  classes = 'nav-collapsable nav-item';

  @HostBinding('class.open')
  public isOpen = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _rootNavigationService: RootNavigationService,
    private _router: Router
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else {
          this.collapse();
        }
      });

    this._rootNavigationService.onItemCollapsed.pipe(takeUntil(this._unsubscribeAll)).subscribe(clickedItem => {
      if (clickedItem && clickedItem.children) {
        if (this.isChildrenOf(this.item, clickedItem)) {
          return;
        }

        if (this.isUrlInChildren(this.item, this._router.url)) {
          return;
        }

        if (this.item !== clickedItem) {
          this.collapse();
        }
      }
    });

    if (this.isUrlInChildren(this.item, this._router.url)) {
      this.expand();
    } else {
      this.collapse();
    }

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

  toggleOpen(ev): void {
    ev.preventDefault();

    this.isOpen = !this.isOpen;
    this._rootNavigationService.onItemCollapsed.next(this.item);
    this._rootNavigationService.onItemCollapseToggled.next();
  }

  expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    this._changeDetectorRef.markForCheck();

    this._rootNavigationService.onItemCollapseToggled.next();
  }

  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    this._changeDetectorRef.markForCheck();

    this._rootNavigationService.onItemCollapseToggled.next();
  }

  isChildrenOf(parent, item): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this.isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }

  isUrlInChildren(parent, url): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this.isUrlInChildren(child, url)) {
          return true;
        }
      }

      if (child.url === url || url.includes(child.url)) {
        return true;
      }
    }

    return false;
  }
}
