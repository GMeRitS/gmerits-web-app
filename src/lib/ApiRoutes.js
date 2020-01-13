import config from '../config';
import AuthDataStorage from '../helpers/StorageHelpers/AuthDataStorage';

export default {
  get base() {
    return config.apiHost;
  },

  getAppConfig(appIdentifier) {
    return `${this.base}/content/app/${appIdentifier}`;
  },

  signin() {
    return `${this.base}/client/account/login/request`;
  },

  validateLoginData() {
    return `${this.base}/client/account/login`;
  },

  validateMagicLoginToken(token) {
    return `${this.base}/api/magiclogin/validates/${token}`;
  },

  signout() {
    return `${this.base}/api/user/logouts/${AuthDataStorage.getUuid()}`;
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
    return `${this.base}/client/user/${userId}`;
  },

  getMyProfileDetail() {
    return `${this.base}/client/account/profile`;
  },

  updateEditedUserProfile() {
    return `${this.base}/client/account/profile`;
  },

  getOrganizationDetail(organizationId) {
    return `${this.base}/api/organization/viewusers/${organizationId}`;
  },

  endorseUser(topicId, userId) {
    return `${this.base}/client/user/${userId}/topic/${topicId}/endorsement`;
  },

  removeEndorseUser(topicId, userId) {
    return `${this.base}/client/user/${userId}/topic/${topicId}/endorsement`;
  },

  favouriteUser(userId) {
    return `${this.base}/client/user/${userId}/favourite`;
  },

  removeFavouriteUser(userId) {
    return `${this.base}/client/user/${userId}/favourite`;
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
    return `${this.base}/client/schedule/session/${sessionId}/reservation`;
  },

  cancelReservation(sessionId) {
    return `${this.base}/client/schedule/session/${sessionId}/reservation`;
  },

  favouriteSession(sessionId) {
    return `${this.base}/client/schedule/session/${sessionId}/favourite`;
  },

  removeFavouriteSession(sessionId) {
    return `${this.base}/client/schedule/session/${sessionId}/favourite`;
  },

  getSearchTopic(topicSearchInput) {
    return `${this.base}/api/topic/search?search=${topicSearchInput}`;
  },

  uploadUserProfileImage(imageIdentifier) {
    return `/api/media/images/${imageIdentifier}?apikey=hiekkalaatikko123`;
  }
};
