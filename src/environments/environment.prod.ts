export const environment = {
  production: true,
  serverApi: {
    baseUrl: 'http://dev.testing.com:3000'
  },
  socketConfig: {
    url: 'http://dev.testing.com:3000',
    opts: {
      transports: ['websocket']
    }
  }
};
