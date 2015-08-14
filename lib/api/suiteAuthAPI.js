'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _datatypeUrl = require('../datatype/url');

var _datatypeUrl2 = _interopRequireDefault(_datatypeUrl);

var _datatypeUtils = require('../datatype/utils');

var _datatypeUtils2 = _interopRequireDefault(_datatypeUtils);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _thenjs = require('thenjs');

var _thenjs2 = _interopRequireDefault(_thenjs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var postJson = _datatypeUtils2['default'].postJson;
var getResponse = _datatypeUtils2['default'].getResponse;

var suiteAuthAPI = (function () {
  function suiteAuthAPI(suiteid, suitesecret, ticket) {
    _classCallCheck(this, suiteAuthAPI);

    this.suiteid = suiteid;
    this.suitesecret = suitesecret;
    this.ticket = ticket;
  }

  /**
   * 获取应用套件令牌
   * @param  string suiteid     应用套件id
   * @param  string suitesecret 应用套件secret
   * @param  string ticket      微信后台推送的ticket
   * @return object<Thenjs>
   * @example
   * {
   * 	"suite_access_token":"61W3mEpU66027wgNZ_MhGHNQDHnFATkDa9-2llqrMBjUwxRSNPbVsMmyD-yq8wZETSoE5NQgecigDrSHkPtIYA",
   * 	"expires_in":7200
   * }
   */

  _createClass(suiteAuthAPI, [{
    key: 'getSuiteToken',
    value: function getSuiteToken() {
      var self = this;
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
        var posturl = _config2['default'].getSuiteTokenURL;
        var postdata = {
          "suite_id": self.suiteid,
          "suite_secret": self.suitesecret,
          "suite_ticket": self.ticket
        };
        postJson(posturl, postdata, function (err, body) {
          body.fetchTime = +new Date();
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 获取预授权码
     * @return object<Thenjs>
     * @example
     * {
     *   "errcode":"0" ,
     *   "errmsg":"ok" ,
     *   "pre_auth_code":"Cx_Dk6qiBE0Dmx4EmlT3oRfArPvwSQ-oa3NL_fwHM7VI08r52wazoZX2Rhpz1dEw",
     *   "expires_in":1200
     * }
     */
  }, {
    key: 'getPreAuthCode',
    value: function getPreAuthCode() {
      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getSuiteToken().then(function (next2, resp) {
          if (resp.access_token) {
            return next(null, resp.access_token);
          }
          return next(resp);
        });
      }).then(function (next, token) {
        var posturl = _datatypeUrl2['default'].getPreAuthCodeURL(token);
        var postdata = {
          "suite_id": self.suiteid
        };
        postJson(posturl, postdata, function (err, body) {
          body.access_token = token;
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 设置授权配置
     * @param  array applist 需要授权的appid 列表
     * @return object<Thenjs>
     * @example
     * {
     * 	"errcode": 0,
     * 	"errmsg": "ok"
     * }
     */
  }, {
    key: 'getSessionInfo',
    value: function getSessionInfo(applist) {
      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getPreAuthCode().then(function (next2, resp) {
          if (resp.pre_auth_code) {
            return next(null, resp);
          }
          return next(resp);
        });
      }).then(function (next, result) {
        var posturl = _datatypeUrl2['default'].setSessionInfoURL(result.access_token);
        var postdata = {
          "pre_auth_code": result.pre_auth_code,
          "session_info": {
            "appid": applist
          }
        };
        postJson(posturl, postdata, function (err, body) {
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 获取企业号的永久授权码
     * @param  string authcode 临时授权码会在授权成功时附加在redirect_uri中跳转回应用提供商网站。
     * @return object<Thenjs>
     * @example
     * {
     *   "access_token": "xxxxxx",
     *   "expires_in": 7200,
     *   "permanent_code": "xxxx",
     *   "auth_corp_info": {
     *     "corpid": "xxxx",
     *     "corp_name": "name",
     *     "corp_type": "verified",
     *     "corp_round_logo_url": "xxxxxx",
     *     "corp_square_logo_url": "yyyyy",
     *     "corp_user_max": 50,
     *     "corp_agent_max": 30,
     *     "corp_wxqrcode": "zzzzz"
     *   },
     *   "auth_info": {
     *      "agent" : [
     *        {
     *          "agentid":1,
     *          "name":"NAME",
     *          "square_logo_url":"xxxxxx",
     *          "round_logo_url":"yyyyyy",
     *          "appid":1,
     *          "api_group":["get_location"]
     *        },
     *        {
     *          "agentid":2,
     *          "name":"NAME2",
     *          "square_logo_url":"xxxxxx",
     *          "round_logo_url":"yyyyyy",
     *          "appid":5,
     *          "api_group":[]
     *        }
     *      ],
     *      "department": [
     *        {
     *          "id":2,
     *          "name":"PARTYNAME",
     *          "parentid":1,
     *          "writable":"true"
     *        }
     *      ]
     *    },
     *    "auth_user_info": {
     *      "email":"xxxx@aaa.com",
     *      "mobile":1234567890
     *    }
     *  }
     */
  }, {
    key: 'getPermanentCode',
    value: function getPermanentCode(authcode) {
      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getSuiteToken().then(function (next2, resp) {
          if (resp.access_token) {
            return next(null, resp.access_token);
          }
          return next(resp);
        });
      }).then(function (next, token) {
        var posturl = _datatypeUrl2['default'].getPermanentCodeURL(token);
        var postdata = {
          "suite_id": self.suiteid,
          "auth_code": authcode
        };
        postJson(posturl, postdata, function (err, body) {
          body.suite_access_token = token;
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 获取企业号的授权信息
     * @param  string corpid        在获取企业永久授权码时获取
     * @param  string permanentCode 在获取企业永久授权码时获取
     * @return object<Thenjs>
     * @example
     * {
     *   "auth_corp_info": {
     *     "corpid": "xxxx",
     *     "corp_name": "name",
     *     "corp_type": "verified",
     *     "corp_round_logo_url": "xxxxxx",
     *     "corp_square_logo_url": "yyyyy",
     *     "corp_user_max": 50,
     *     "corp_agent_max": 30,
     *     "corp_wxqrcode": "zzzzz"
     *   },
     *   "auth_info": {
     *     "agent" : [
     *        {
     *          "agentid":1,
     *          "name":"NAME",
     *          "round_logo_url":"xxxxxx",
     *          "square_logo_url":"yyyyyy",
     *          "app_id":1,
     *          "api_group":["get_location"]
     *        },
     *        {
     *          "agentid":2,
     *          "name":"NAME2",
     *          "round_logo_url":"xxxxxx",
     *          "square_logo_url":"yyyyyy",
     *          "app_id":5,
     *          "api_group":[]
     *        }
     *      ],
     *    "department":[
     *      {
     *        "id":2,
     *        "name":"PARTYNAME",
     *        "parentid":1,
     *        "writable":"true"
     *      }
     *    ]
     *   }
     * }
     */
  }, {
    key: 'getAuthInfo',
    value: function getAuthInfo(corpid, permanentCode) {
      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getSuiteToken().then(function (next2, resp) {
          if (resp.access_token) {
            return next(null, resp.access_token);
          }
          return next(resp);
        });
      }).then(function (next, token) {
        var posturl = _datatypeUrl2['default'].getAuthInfoURL(token);
        var postinfo = {
          "suite_id": self.suiteid,
          "auth_corpid": corpid,
          "permanent_code": permanentCode
        };
        postJson(posturl, postdata, function (err, body) {
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 获取企业号应用
     * @param  string corpid        在获取企业永久授权码时获取
     * @param  string permanentCode 在获取企业永久授权码时获取
     * @return object<Thenjs>
     * @example
     * {
     *   "errcode":"0" ,
     *   "errmsg":"ok" ,
     *   "agentid":1 ,
     *   "name":"NAME" ,
     *   "square_logo_url":"xxxxxxxx" ,
     *   "round_logo_url":"yyyyyyyy" ,
     *   "description":"desc" ,
     *   "allow_userinfos":{
     *   	"user":[
     *   		{
     *   			"userid":"id1",
     *   		 	"status":1
     *       },
     *       {
     *       	"userid":"id2",
     *         "status":1
     *       },
     *       {
     *     	  "userid":"id3",
     *     	  "status":1
     *        }
     *     ]
     *   },
     *   "allow_partys": {
     *     "partyid": [1]
     *   }
     *   "allow_tags": {
     *     "tagid": [1,2,3]
     *   }
     *   "close":0 ,
     *   "redirect_domain":"www.qq.com",
     *   "report_location_flag":0,
     *   "isreportuser":0,
     *   "isreportenter":0
     * }
     */
  }, {
    key: 'getAgent',
    value: function getAgent(corpid, permanentCode) {
      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getSuiteToken().then(function (next2, resp) {
          if (resp.access_token) {
            return next(null, resp.access_token);
          }
          return next(resp);
        });
      }).then(function (next, token) {
        var posturl = _datatypeUrl2['default'].getAgentURL(token);
        var postdata = {
          "suite_id": self.suiteid,
          "auth_corpid": corpid,
          "permanent_code": permanentCode
        };
        postJson(posturl, postdata, function (err, body) {
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 设置企业号应用
     * @param  string corpid        在获取企业永久授权码时获取
     * @param  string permanentCode 在获取企业永久授权码时获取
     * @param  object agent
     * {
     *   "agentid": 5,
     *   "report_location_flag": 0,
     *   "logo_mediaid": "xxxxx",
     *   "name": "NAME",
     *   "description": "DESC",
     *   "redirect_domain": "xxxxxx",
     *   "isreportuser":0,
     *   "isreportenter":0
     * }
     * @return object<Thenjs>
     * @example
     * {
     *   "errcode":"0",
     *   "errmsg":"ok"
     * }
     */
  }, {
    key: 'setAgent',
    value: function setAgent(corpid, permanentCode, agent) {
      var _this = this;

      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getSuiteToken().then(function (next2, resp) {
          if (resp.access_token) {
            return next(null, resp.access_token);
          }
          return next(resp);
        });
      }).then(function (next, token) {
        var posturl = _datatypeUrl2['default'].setAgentURL(token);
        var postdata = {
          "suite_id": _this.suiteid,
          "corpid": corpid,
          "permanent_code": permanentCode,
          "agent": agent
        };
        postJson(posturl, postdata, function (err, body) {
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }

    /**
     * 获取企业号access_token
     * @param  string corpid        在获取企业永久授权码时获取
     * @param  string permanentCode 在获取企业永久授权码时获取
     * @return object<Thenjs>
     * {
     *   "access_token": "xxxxxx",
     *   "expires_in": 7200
     * }
     */
  }, {
    key: 'getCorpToken',
    value: function getCorpToken(corpid, permanentCode) {
      var _this2 = this;

      var self = this;
      return (0, _thenjs2['default'])(function (next) {
        self.getSuiteToken().then(function (next2, resp) {
          if (resp.access_token) {
            return next(null, resp.access_token);
          }
          return next(resp);
        });
      }).then(function (next, token) {
        var posturl = _datatypeUrl2['default'].getCorpTokenURL(token);
        var postdata = {
          "suite_id": _this2.suiteid,
          "auth_corpid": corpid,
          "permanent_code": permanentCode
        };
        postJson(posturl, postdata, function (err, body) {
          getResponse(err, body, next);
        });
      }).fail(function (next, err) {
        return next(null, err);
      });
    }
  }]);

  return suiteAuthAPI;
})();

;

exports['default'] = suiteAuthAPI;
module.exports = exports['default'];