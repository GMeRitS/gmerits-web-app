let env = '';
let apiHost = '';
let appHost = '';

export default {
  init(global) {
    env = 'production';
    apiHost = 'https://devapi.mesensei.com';
    appHost = 'https://';
  },

  get apiHost() {
    return apiHost;
  },

  get appHost() {
    return appHost;
  },

  get isProduction() {
    return env === 'production';
  },

  get isDevelopment() {
    return env === 'development';
  },

  get isMobile() {
    return env === 'mobile';
  }
};
