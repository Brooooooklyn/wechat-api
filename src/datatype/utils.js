import request from 'request';
import basicAPI from '../api/basicAPI';

var utils = {

  getAccessToken: (next) => {
    basicAPI.getAccessToken()
    .then((next2, resp) => {
      var token = resp.access_token;
      return next(null, token);
    });
  },

  postJson: (url, postdata, callback) => {
    return request.post({
      url: url,
      body: JSON.stringify(postdata),
      headers: {
        'content-type': 'application/json'
      }
    },
    (err, resp, body) => {
      callback(err, JSON.parse(body));
    })
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
