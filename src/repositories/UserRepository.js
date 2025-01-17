import routes from '../lib/ApiRoutes';
import { checkResponse, get, post, del, put } from '../lib/FetchHelper';

export default {
  getUser() {
    return get(routes.getUser(), {}, true).then(checkResponse);
  },

  filterSearch(searchInput) {
    return get(routes.filerSearch(searchInput), {}, true).then(checkResponse);
  },

  sortResult(id) {
    return get(routes.sortResult(id), {}, true).then(checkResponse);
  },

  getUserDetail(userId) {
    return get(routes.getUserDetail(userId), {}, true).then(checkResponse);
  },

  getMyProfileDetail() {
    return get(routes.getMyProfileDetail(), {}, true).then(checkResponse);
  },

  endorseUser(topicId, userId) {
    return post(routes.endorseUser(topicId, userId), {}).then(checkResponse);
  },

  removeEndorseUser(topicId, userId) {
    return del(routes.removeEndorseUser(topicId, userId)).then(checkResponse);
  },

  favouriteUser(userId) {
    return post(routes.favouriteUser(userId), {}).then(checkResponse);
  },

  removeFavouriteUser(userId) {
    return del(routes.removeFavouriteUser(userId)).then(checkResponse);
  },

  getFavouriteUsers() {
    return get(routes.getFavouriteUsers(), {}, true).then(checkResponse);
  },

  getMatchRecommendations() {
    return get(routes.getMatchRecommendations(), {}, true).then(checkResponse);
  },

  getSameTopicUsers(topicId) {
    return get(routes.getSameTopicUsers(topicId), {}, true).then(checkResponse);
  },

  updateEditedUserProfile(editFields) {
    return put(routes.updateEditedUserProfile(), {
      user: editFields.user
    }).then(checkResponse);
  },

  uploadUserProfileImage(imageIdentifier, imageData) {
    return put(routes.uploadUserProfileImage(imageIdentifier), imageData).then(
      checkResponse
    );
  },

  getSearchTopic(topicSearchInput) {
    return get(routes.getSearchTopic(topicSearchInput), {}, true).then(
      checkResponse
    );
  }
};
