import LocalStorage from '../../lib/LocalStorage';

const StorageKeys = {
  appId: 'app_identifier',
  apiKey: ':apikey',
  deviceId: ':device_id',
  uuid: ':uuid'
};

export default {
  getAppId: () => LocalStorage.get(StorageKeys.appId),
  // isAppIdAvailable: () => (this.getAppId() !== null),
  hasAppIdChanged: newAppId => LocalStorage.get(StorageKeys.appId) !== newAppId,
  storeAppId: appId => {
    if (appId) {
      LocalStorage.set(StorageKeys.appId, appId);
    }
  },
  isAuthDataAvailable: appId =>
    LocalStorage.get(StorageKeys.appId) &&
    LocalStorage.get(`${appId}${StorageKeys.apiKey}`),
  getDeviceId: () =>
    LocalStorage.get(
      `${LocalStorage.get(StorageKeys.appId)}${StorageKeys.deviceId}`
    ),
  storeDeviceId: deviceId => {
    if (LocalStorage.get(StorageKeys.appId) && deviceId) {
      LocalStorage.set(
        `${LocalStorage.get(StorageKeys.appId)}${StorageKeys.deviceId}`,
        deviceId
      );
    }
  },
  // isDeviceIdAvailable: appId => (this.getDeviceId(appId) !== null),
  storeApiKey: apiKey => {
    const appId = LocalStorage.get(StorageKeys.appId);

    if (appId && apiKey) {
      LocalStorage.set(`${appId}${StorageKeys.apiKey}`, apiKey);
    }
  },
  storeUuid: uuid => {
    const appId = LocalStorage.get(StorageKeys.appId);

    if (appId && uuid) {
      LocalStorage.set(`${appId}${StorageKeys.uuid}`, uuid);
    }
  },
  getApiKey: () =>
    LocalStorage.get(
      `${LocalStorage.get(StorageKeys.appId)}${StorageKeys.apiKey}`
    ),
  getUuid: () =>
    LocalStorage.get(
      `${LocalStorage.get(StorageKeys.appId)}${StorageKeys.uuid}`
    ),
  removeApiKeyAndUuid: () => {
    LocalStorage.remove(
      `${LocalStorage.get(StorageKeys.appId)}${StorageKeys.apiKey}`
    );
    LocalStorage.remove(
      `${LocalStorage.get(StorageKeys.appId)}${StorageKeys.uuid}`
    );
  }
};
