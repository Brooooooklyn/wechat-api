import request from 'request';
import basicAPI from '../api/basicAPI';
import authAPI from '../api/authAPI';
import suiteAPI from '../api/suiteAPI';

var utils = {
  postJson: (url, postdata, callback) => {
    return request.post({
      url: url,
      body: JSON.stringify(postdata),
      headers: {
        'content-type': 'application/json'
      }
    },
    (err, resp, body) => {
      callback(err, body);
    })
  },

  getAccessToken: (next) => {
    basicAPI.getAccessToken()
    .then((next2, resp) => {
      var token = resp.access_token;
      return next(null, token);
    });
  },

  getProviderToken: (next) => {
    authAPI.getProviderToken
    .then((next2, resp) => {
      var token = resp.access_token;
      next(null, token);
    });
  },

  getResponse: (err, body, next) => {
    var bodyError;
    if(!body || body.errcode) {
      bodyError = body;
    }
    return next(bodyError || err, body);
  }
};

export default utils;
