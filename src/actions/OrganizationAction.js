import OrganizationConstants from '../constants/OrganizationConstants';

const { GET_ORGANIZATION_DETAIL } = OrganizationConstants;

export const getOrganizationDetail = organizationId => ({
  type: `${GET_ORGANIZATION_DETAIL}_REQUEST`,
  payload: { organizationId }
});

export default {
  getOrganizationDetail
};
