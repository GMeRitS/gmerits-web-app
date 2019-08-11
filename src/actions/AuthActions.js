import AuthConstants from '../constants/AuthConstants';

const {
  SIGNIN,
  SIGNIN_ANONYMOUS,
  VALIDATE_MAGIC_LOGIN_TOKEN,
  SIGNOUT
} = AuthConstants;

export const signin = email => ({
  type: `${SIGNIN}_REQUEST`,
  payload: { email }
});

export const signinAnonymous = (device_id, username) => ({
  type: `${SIGNIN_ANONYMOUS}_REQUEST`,
  payload: { device_id, username }
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
  signinAnonymous,
  validateMagicLoginToken,
  signout
};
