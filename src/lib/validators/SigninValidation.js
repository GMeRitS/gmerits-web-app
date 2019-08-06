import _isEmpty from 'lodash/isEmpty';
import ValidationHelper from '../ValidationHelper';

export default {
  validate(fields) {
    let errors = {};

    ['email', 'username'].forEach(field => {
      if (_isEmpty(fields[field])) {
        errors[field] = `errors.${field}.empty`;
      }
    });

    if (fields.email && !ValidationHelper.isValidEmail(fields.email)) {
      errors.email = 'errors.email.pattern_fail';
    }
    if (fields.username && !ValidationHelper.isValidName(fields.username)) {
      errors.username = 'errors.userName.pattern_fail';
    }

    return errors;
  }
};
