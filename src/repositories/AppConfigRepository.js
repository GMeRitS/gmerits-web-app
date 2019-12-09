import routes from '../lib/ApiRoutes';
import { checkResponse, get } from '../lib/FetchHelper';

export default {
  getAppConfig(appIdentifier) {
    return get(routes.getAppConfig(appIdentifier), {}, true).then(
      checkResponse
    );
  }
};
