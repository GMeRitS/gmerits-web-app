import AuthConstants from '../constants/AuthConstants';

const { SIGNIN } = AuthConstants;

export const signin = email => ({
  type: `${SIGNIN}_REQUEST`,
  payload: { email }
});

export default {
  signin
};
