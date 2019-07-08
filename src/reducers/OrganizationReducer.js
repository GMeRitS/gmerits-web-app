import createReducer from '../lib/utils/CreateReducer';
import OrganizationConstants from '../constants/OrganizationConstants';

const { GET_ORGANIZATION_DETAIL } = OrganizationConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {},
  organizationDetail: {}
});

export default createReducer(getInitialState, {
  [`${GET_ORGANIZATION_DETAIL}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),
  [`${GET_ORGANIZATION_DETAIL}_SUCCESS`]: (state, { payload: organizationDetail }) => ({
    loading: true,
    organizationDetail
  }),
  [`${GET_ORGANIZATION_DETAIL}_FAILURE`]: (state, { payload: error }) => ({
    loading: true,
    error
  })
});