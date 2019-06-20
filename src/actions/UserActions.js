import UserConstants from '../constants/UserConstants';

const { GET_USER } = UserConstants;

export const getUser = () => ({
  type: `${GET_USER}_REQUEST`
});

export default {
  getUser
};