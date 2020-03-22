export const environment = {
  production: true,
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
