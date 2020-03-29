import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'https://auth.rangoon-tech.com/auth',
  realm: 'jhipster',
  clientId: 'web_app',
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  serverApi: {
    url: 'https://system.zezawar.com/',
  },
  client: {
    baseUrl: 'https://seller.zezawar.com/',
  },
  socketConfig: {
    url: 'https://system.zezawar.com/',
    opts: {
      transports: ['websocket'],
    },
  },
};
