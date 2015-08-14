'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _thenjs = require('thenjs');

var _thenjs2 = _interopRequireDefault(_thenjs);

var _basicAPI = require('./basicAPI');

var _basicAPI2 = _interopRequireDefault(_basicAPI);

var _datatypeUtils = require('../datatype/utils');

var _datatypeUtils2 = _interopRequireDefault(_datatypeUtils);

var _datatypeUrl = require('../datatype/url');

var _datatypeUrl2 = _interopRequireDefault(_datatypeUrl);

var corpid = _config2['default'].PROVIDER.corpid;
var providerSecret = _config2['default'].PROVIDER.providersecret;

var postJson = _datatypeUtils2['default'].postJson;
var getAccessToken = _datatypeUtils2['default'].getAccessToken;
var getResponse = _datatypeUtils2['default'].getResponse;
var getProviderToken = _datatypeUtils2['default'].getProviderToken;

var authAPI = {
  getProviderToken: function getProviderToken() {
    var self = authAPI;
    return (0, _thenjs2['default'])(function (next) {
      var now = +new Date();
      var token = self.token;
      if (token) {
        var expire = now - token.fetchTime;
        var expiresin = token.expiresin;
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
      var posturl = _datatypeUrl2['default'].getProviderTokenURL;
      var postdata = {
        "corpid": corpid,
        "provider_secret": providerSecret
      };
      _request2['default'].post({
        url: posturl,
        body: JSON.stringify(postdata),
        headers: {
          'content-type': 'application/json'
        }
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
      next(null, err);
    });
  },

  /**
   * 获取企业管理员登陆信息
   * @param  string authcode oauth2.0授权企业号管理员登录产生的code
   * @return object<Thenjs>
   * @example
   * {
   *   "is_sys":true,
   *   "is_inner":true,
   *   "user_info":{
   *     "email":"xxxx",
   *     "userid":"xxxx",
   *     "name":"xxxx",
   *     "avatar":"xxxx"
   *     "mobile":"xxxx"
   *   },
   *   "corp_info":{
   *   	"corpid":"wx6c698d13f7a409a4",
   *   	"corp_name":"zanktan_test",
   *   	"corp_type":"verified",
   *   	"corp_round_logo_url": "http:\\mmbiz.qpic.cn\mmbiz\dO7fnVotTkoLYdaxcfXD5FypiaibRKkmRoEic2ks2HgJk9icKwbmmtQFdOF11JdicMbzGibTAtaOrLEzDhcZNv6VwnkA/0",
   *   	"corp_square_logo_url":"http:\\wx.qlogo.cn/mmhead/Q3auHgzwzM6YrDZaLe8iahpKbKYf7HEtoicvAYCRIDVqZE2ydk46yZ4A/0",
   *   	"corp_user_max":10,
   *   	"corp_agent_max":5,
   *   },
   *   "agent":[
   *   	{"agentid":0,"auth_type":1},
   *   	{"agentid":1,"auth_type":1},
   *   	{"agentid":2,"auth_type":1}
   *   ],
   *   "auth_info":{
   *   	"department":[
   *   		{
   *   			"id":"2",
   *   			"writable":"true"
   *   		}
   *   	]
   *   }
   * }
   */
  getLoginInfo: function getLoginInfo(authcode) {
    var self = authAPI;
    return (0, _thenjs2['default'])(function (next) {
      getProviderToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].getLoginInfoURL(token);
      var postdata = {
        "auth_code": authcode
      };
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, err);
    });
  }
};

exports['default'] = authAPI;
module.exports = exports['default'];