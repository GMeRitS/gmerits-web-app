import AuthConstants from '../constants/AuthConstants';

const { SIGNIN, VALIDATE_MAGIC_LOGIN_TOKEN } = AuthConstants;

export const signin = email => ({
  type: `${SIGNIN}_REQUEST`,
  payload: { email }
});

export const validateMagicLoginToken = token => ({
  type: `${VALIDATE_MAGIC_LOGIN_TOKEN}_REQUEST`,
  payload: { token }
});

export default {
  signin,
  validateMagicLoginToken
};
