import LocalStorage from '../../lib/LocalStorage';
import StorageKeysConstants from '../../constants/StorageKeysConstants';

const { authDataStorageKeys, userInfoStorageKeys } = StorageKeysConstants;

export default {
  storeUserRole: userRole => {
    const appId = LocalStorage.get(authDataStorageKeys.appId);

    if (appId && userRole) {
      LocalStorage.set(`${appId}${userInfoStorageKeys.userRole}`, userRole);
    }
  }
};
