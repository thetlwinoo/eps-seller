export const environment = {
  production: true,
  serverApi: {
    baseUrl: 'https://system.zezawar.com/',
    url: 'http://localhost:8080',
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
