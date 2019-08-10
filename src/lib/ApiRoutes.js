import config from '../config';
import LocalStorage from './LocalStorage';

export default {
  get base() {
    return config.apiHost;
  },

  signin() {
    return `${this.base}/api/magiclogin/starts`;
  },

  signinAnonymous() {
    return `${this.base}/api/user/authenticates`;
  },

  validateMagicLoginToken(token) {
    return `${this.base}/api/magiclogin/validates/${token}`;
  },

  signout() {
    return `${this.base}/api/user/logouts/${LocalStorage.get('uuid')}`;
  },

  getUser() {
    return `${this.base}/api/mobile/users`;
  },

  filerSearch(searchInput) {
    return `${
      this.base
    }/api/mobile/search?_search=${searchInput}&include_users=true`;
  },

  sortResult(id) {
    return `${this.base}/api/mobile/users?_sort=${id}`;
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
  },

  getSessionDetail(sessionId) {
    return `${this.base}/api/schedule/sessions/${sessionId}`;
  },

  reserveSeat(sessionId) {
    return `${this.base}/api/schedule/registers/${sessionId}`;
  },

  cancelReservation(sessionId) {
    return `${this.base}/api/schedule/registers/${sessionId}`;
  },

  favouriteSchedule(sessionId) {
    return `${this.base}/api/schedule/favourites/${sessionId}`
  },

  removeFavouriteSchedule(sessionId) {
    return `${this.base}/api/schedule/favourites/${sessionId}`
  },

  getSearchTopic(topicSearchInput) {
    return `${this.base}/api/topic/search?search=${topicSearchInput}`;
  }
};
