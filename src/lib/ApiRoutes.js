import config from '../config';

export default {
  get base() {
    return config.apiHost;
  },

  getUser() {
    return `${this.base}/api/mobile/users`;
  },

  getUserDetail(userId) {
    return `${this.base}/api/user/profiles/${userId}`;
  },

  getOrganizationDetail(organizationId) {
    return `${this.base}/api/organization/viewusers/${organizationId}`;
  },

  endorseUser(topicId, userId) {
    return `${this.base}/api/topic/endorses/${topicId}/mentors/${userId}`;
  },

  removeEndorseUser(topicId, userId) {
    return `${this.base}/api/topic/endorses/${topicId}/mentors/${userId}`;
  }
};
