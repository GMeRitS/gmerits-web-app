let env = '';
let apiHost = '';
let appHost = '';

export default {
  init(window) {
    env = window.ENV || 'development';
    apiHost = window.API_HOST || 'https://devapi.mesensei.com';
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
