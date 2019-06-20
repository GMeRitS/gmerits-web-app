import Url from 'url';

import FormValidationError from './FormValidationError';
import BackendBadRequestError from './BackendBadRequestError';

function headers() {
  return new Headers({
    'X-Mesensei-Appkey': 'a56qD2kKBI5KJuNJ',
    'X-Mesensei-Apikey': 'keabirahbelirybcakuehrckufshrf',
    'Content-Type': 'application/json'
  });
}

export function checkResponse(response) {
  if (response.ok) {
    return response.json().catch(err => {
      throw err;
    });
  } else {
    if (response.status === 401) {
      throw new Error(
        `Failed status ${response.status} (${response.statusText}) on request ${
          response.url
        }.`
      );
    } else if (response.status === 422) {
      return response.json().then(e => {
        throw new FormValidationError(e.error);
      });
    } else if (response.status === 400) {
      return response.json().then(e => {
        throw new BackendBadRequestError(e);
      });
    } else {
      throw new Error(
        `Failed status ${response.status} (${response.statusText}) on request ${
          response.url
        }.`
      );
    }
  }
}

export function get(url, options, withHeaders = false) {
  const u = Url.parse(url);
  u.query = options;
  if (withHeaders) {
    return fetch(u.format(), {
      method: 'GET',
      headers: headers()
    });
  } else {
    return fetch(u.format(), {
      method: 'GET'
    });
  }
}

export default {
  checkResponse,
  get
};
