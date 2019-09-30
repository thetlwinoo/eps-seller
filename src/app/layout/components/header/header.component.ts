import { Component, ChangeDetectionStrategy, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AccountService } from '@root/services/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerNav', { static: false }) headerNav: ElementRef;
  isMobile: boolean;
  totalQuantity$: Observable<number>;

  constructor(
    private _platform: Platform,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
