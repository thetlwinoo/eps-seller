export const environment = {
  production: true,
  serverApi: {
    baseUrl: 'https://ecp-resource.herokuapp.com/'
  },
  socketConfig: {
    url: 'https://ecp-resource.herokuapp.com/',
    opts: {
      transports: ['websocket']
    }
  }
};
