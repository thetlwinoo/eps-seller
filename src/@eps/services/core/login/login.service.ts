import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { AccountService } from '@eps/services/core/auth/account.service';
import { AuthServerProvider } from '@eps/services/core/auth/auth-jwt.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials): any {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
