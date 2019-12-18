import LocalStorage from '../../lib/LocalStorage';
import StorageKeysConstants from '../../constants/StorageKeysConstants';

const { authDataStorageKeys } = StorageKeysConstants;

export default {
  getAppId: () => LocalStorage.get(authDataStorageKeys.appId),
  // isAppIdAvailable: () => (this.getAppId() !== null),
  hasAppIdChanged: newAppId =>
    LocalStorage.get(authDataStorageKeys.appId) !== newAppId,
  storeAppId: appId => {
    if (appId) {
      LocalStorage.set(authDataStorageKeys.appId, appId);
    }
  },
  isAuthDataAvailable: appId =>
    LocalStorage.get(appId) &&
    LocalStorage.get(`${appId}${authDataStorageKeys.apiKey}`),
  getDeviceId: () =>
    LocalStorage.get(
      `${LocalStorage.get(authDataStorageKeys.appId)}${
        authDataStorageKeys.deviceId
      }`
    ),
  storeDeviceId: deviceId => {
    const appId = LocalStorage.get(authDataStorageKeys.appId);

    if (appId && deviceId) {
      LocalStorage.set(`${appId}${authDataStorageKeys.deviceId}`, deviceId);
    }
  },
  // isDeviceIdAvailable: appId => (this.getDeviceId(appId) !== null),
  storeApiKey: apiKey => {
    const appId = LocalStorage.get(authDataStorageKeys.appId);

    if (appId && apiKey) {
      LocalStorage.set(`${appId}${authDataStorageKeys.apiKey}`, apiKey);
    }
  },
  storeUuid: uuid => {
    const appId = LocalStorage.get(authDataStorageKeys.appId);

    if (appId && uuid) {
      LocalStorage.set(`${appId}${authDataStorageKeys.uuid}`, uuid);
    }
  },
  storeAppKey: appKey => {
    const appId = LocalStorage.get(authDataStorageKeys.appId);

    if (appId && appKey) {
      LocalStorage.set(`${appId}${authDataStorageKeys.appKey}`, appKey);
    }
  },
  getApiKey: () =>
    LocalStorage.get(
      `${LocalStorage.get(authDataStorageKeys.appId)}${
        authDataStorageKeys.apiKey
      }`
    ),
  getUuid: () =>
    LocalStorage.get(
      `${LocalStorage.get(authDataStorageKeys.appId)}${
        authDataStorageKeys.uuid
      }`
    ),
  getAppKey: () =>
    LocalStorage.get(
      `${LocalStorage.get(authDataStorageKeys.appId)}${
        authDataStorageKeys.appKey
      }`
    ),
  removeApiKeyAndUuid: () => {
    LocalStorage.remove(
      `${LocalStorage.get(authDataStorageKeys.appId)}${
        authDataStorageKeys.apiKey
      }`
    );
    LocalStorage.remove(
      `${LocalStorage.get(authDataStorageKeys.appId)}${
        authDataStorageKeys.uuid
      }`
    );
  }
};
