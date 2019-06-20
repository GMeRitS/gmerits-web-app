import _snakeCase from 'lodash/snakeCase';

class BackendBadRequestError {
  constructor(error) {
    this.error_code = _snakeCase(error.error_code);
  }
}

export default BackendBadRequestError;