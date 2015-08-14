'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datatypeUrl = require('../datatype/url');

var _datatypeUrl2 = _interopRequireDefault(_datatypeUrl);

var _datatypeUtils = require('../datatype/utils');

var _datatypeUtils2 = _interopRequireDefault(_datatypeUtils);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _thenjs = require('thenjs');

var _thenjs2 = _interopRequireDefault(_thenjs);

var postJson = _datatypeUtils2['default'].postJson;
var getAccessToken = _datatypeUtils2['default'].getAccessToken;
var getResponse = _datatypeUtils2['default'].getResponse;

var basicAPI = {
  /**
   * 获取access_token方法
   * @return object<Thenjs> Thenjs 对象
   */
  getAccessToken: function getAccessToken() {
    var corpid = _config2['default'].ENTERPRISE_WECHAT.corpid;
    var secret = _config2['default'].ENTERPRISE_WECHAT.secret;
    var qs = 'corpid=' + corpid + '&corpsecret=' + secret;
    var tokenURL = _datatypeUrl2['default'].tokenURL(qs);
    var self = basicAPI;
    return (0, _thenjs2['default'])(function (next) {
      var now = +new Date();
      var token = self.token;
      if (token) {
        var expire = now - token.fetchTime;
        var expiresin = token.expires_in;
        if (expire < parseInt(expiresin)) {
          var result = {
            access_token: token.access_token,
            expires_in: expiresin,
            fetchTime: now
          };
          return next(null, result);
        } else {
          return next();
        }
      } else {
        return next();
      }
    }).then(function (next, result) {
      if (result) {
        return next(null, result);
      }
      _request2['default'].get({
        url: tokenURL,
        json: true
      }, function (err, resp, body) {
        var bodyError;
        if (!body || body.errcode) {
          bodyError = body;
        }
        if (body.access_token) {
          body.fetchTime = +new Date();
          self.token = body;
        }
        return next(err || bodyError, body);
      });
    }).fail(function (next, err) {
      return next(err);
    });
  }
};

exports['default'] = basicAPI;
module.exports = exports['default'];