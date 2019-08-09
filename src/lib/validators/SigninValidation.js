import _isEmpty from 'lodash/isEmpty';
import ValidationHelper from '../ValidationHelper';

export default {
  validate(fields) {
    let errors = {};

    ['email'].forEach(field => {
      if (_isEmpty(fields[field])) {
        errors[field] = `errors.${field}.empty`;
      }
    });

    if (fields.email && !ValidationHelper.isValidEmail(fields.email)) {
      errors.email = 'errors.email.pattern_fail';
    }

    return errors;
  }
};
