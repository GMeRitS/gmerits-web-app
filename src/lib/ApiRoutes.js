import config from '../config';

export default {
  get base() {
    return config.apiHost;
  },

  signin() {
    return `${this.base}/api/magiclogin/starts`;
  },

  validateMagicLoginToken(token) {
    return `${this.base}/api/magiclogin/validates/${token}`;
  },

  getUser() {
    return `${this.base}/api/mobile/users`;
  },

  filerSearch(searchInput) {
    return `${this.base}/api/mobile/search?search=${searchInput}`;
  },

  sortResult(id) {
    return `${this.base}/api/mobile/users?_sort=${id}`
  },

  getUserDetail(userId) {
    return `${this.base}/api/user/profiles/${userId}`;
  },

  getMyProfileDetail(userId) {
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
  },

  favouriteUser(userId) {
    return `${this.base}/api/favourite/adds/${userId}`;
  },

  removeFavouriteUser(userId) {
    return `${this.base}/api/favourite/${userId}`;
  },

  getFavouriteUsers() {
    return `${this.base}/api/favourite/all`;
  },

  getMatchRecommendations() {
    return `${this.base}/api/match/my/recommendations`;
  },

  getSameTopicUsers(topicId) {
    return `${this.base}/api/mobile/users?topic_id=${topicId}`;
  },

  getScheduleList() {
    return `${this.base}/api/schedule/list`;
  },

  getScheduleDetail(scheduleId) {
    return `${this.base}/api/schedule/uuids/${scheduleId}`;
  }
};
