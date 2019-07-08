import routes from '../lib/ApiRoutes';
import { checkResponse, get } from '../lib/FetchHelper';

export default {
  getOrganizationDetail(organizationId) {
    return get(routes.getOrganizationDetail(organizationId), {}, true).then(checkResponse);
  }
};