'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var utils = {
  postJson: function postJson(url, postdata, callback) {
    return _request2['default'].post({
      url: url,
      body: JSON.stringify(postdata),
      headers: {
        'content-type': 'application/json'
      }
    }, function (err, resp, body) {
      callback(err, body);
    });
  }
};

exports['default'] = utils;
module.exports = exports['default'];