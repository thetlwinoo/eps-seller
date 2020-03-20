import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AccountService, LoginService } from '@eps/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerNav') headerNav: ElementRef;
  isMobile: boolean;
  totalQuantity$: Observable<number>;

  constructor(
    private _platform: Platform,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/pages/auth/login']);
  }
}
