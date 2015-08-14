'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datatypeUrl = require('../datatype/url');

var _datatypeUrl2 = _interopRequireDefault(_datatypeUrl);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _thenjs = require('thenjs');

var _thenjs2 = _interopRequireDefault(_thenjs);

var _basicAPI = require('./basicAPI');

var _basicAPI2 = _interopRequireDefault(_basicAPI);

/**
 * @todo 等待与striker协商
 */

var mediaAPI = {
  postMedia: function postMedia(type, media) {
    var postUrl;
    var postdata;
    return (0, _thenjs2['default'])(function (next) {
      _basicAPI2['default'].getAccessToken().then(function (next2, resp) {
        var token = resp.access_token;
        postUrl = _datatypeUrl2['default'].mediaURL(token, type);
        return cont();
      });
    }).then(function (next) {
      _request2['default'].post({
        url: postUrl,
        headers: {
          'content-type': 'multipart/form-data;'
        },
        body: postdata
      });
    }).fail(function (next, err) {
      return cont(null, err);
    });
  }
};

exports['default'] = mediaAPI;
module.exports = exports['default'];