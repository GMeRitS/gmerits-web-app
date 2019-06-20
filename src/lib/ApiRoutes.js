import config from '../config';

export default {
  get base() {
    return config.apiHost;
  },

  getUser() {
    return `${this.base}/api/mobile/users`
  }
};