import AuthConstants from '../constants/AuthConstants';

const { SIGNIN, VALIDATE_MAGIC_LOGIN_TOKEN, SIGNOUT } = AuthConstants;

export const signin = email => ({
  type: `${SIGNIN}_REQUEST`,
  payload: { email }
});

export const validateMagicLoginToken = token => ({
  type: `${VALIDATE_MAGIC_LOGIN_TOKEN}_REQUEST`,
  payload: { token }
});

export const signout = () => ({
  type: `${SIGNOUT}_REQUEST`
});

export default {
  signin,
  validateMagicLoginToken,
  signout
};
