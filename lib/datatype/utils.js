'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _apiBasicAPI = require('../api/basicAPI');

var _apiBasicAPI2 = _interopRequireDefault(_apiBasicAPI);

var utils = {

  getAccessToken: function getAccessToken(next) {
    _apiBasicAPI2['default'].getAccessToken().then(function (next2, resp) {
      var token = resp.access_token;
      return next(null, token);
    });
  },

  postJson: function postJson(url, postdata, callback) {
    return _request2['default'].post({
      url: url,
      body: JSON.stringify(postdata),
      headers: {
        'content-type': 'application/json'
      }
    }, function (err, resp, body) {
      callback(err, JSON.parse(body));
    });
  },

  getResponse: function getResponse(err, body, next) {
    var bodyError;
    if (!body || body.errcode) {
      bodyError = body;
    }
    return next(bodyError || err, body);
  }
};

exports['default'] = utils;
module.exports = exports['default'];