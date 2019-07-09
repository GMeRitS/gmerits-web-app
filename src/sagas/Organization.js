import { takeEvery, put, call } from 'redux-saga/effects';

import OrganizationConstants from '../constants/OrganizationConstants';
import OrganizationRepository from '../repositories/OrganizationRepository';

const { GET_ORGANIZATION_DETAIL } = OrganizationConstants;

export function* watchGetOrganizationDetail() {
  yield takeEvery(`${GET_ORGANIZATION_DETAIL}_REQUEST`, function*({
    payload: { organizationId }
  }) {
    try {
      const organizationDetail = yield call(
        OrganizationRepository.getOrganizationDetail,
        organizationId
      );

      yield put({
        type: `${GET_ORGANIZATION_DETAIL}_SUCCESS`,
        payload: organizationDetail
      });
    } catch (errors) {
      yield put({
        type: `${GET_ORGANIZATION_DETAIL}_FAILURE`,
        payload: errors
      });
    }
  });
}
