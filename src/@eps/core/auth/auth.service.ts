import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private location: Location, protected keycloakService: KeycloakService) { }

  login(): void {
    const scopes = 'openid profile offline_access';
    const options: KeycloakLoginOptions = {
      scope: scopes,
      redirectUri: `${location.origin}`
    };
    this.keycloakService.login(options);
  }

  logout(): Promise<void> {
    const redirectUri = `${location.origin}`;
    return this.keycloakService.logout(redirectUri);
  }
}
