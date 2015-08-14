import config from 'config';
import request from 'request';
import Thenjs from 'thenjs';
import basicAPI from './basicAPI';
import utils from '../datatype/utils'
import url from '../datatype/url';

var corpid = config.PROVIDER.corpid;
var providerSecret = config.PROVIDER.providersecret;

var postJson = utils.postJson;
var getAccessToken = utils.getAccessToken;
var getResponse = utils.getResponse;
var getProviderToken = utils.getProviderToken;


var authAPI = {
  getProviderToken: () => {
    var self = authAPI;
    return Thenjs((next) => {
      let now = + new Date();
      let token = self.token;
      if(token) {
        let expire = now - token.fetchTime;
        let expiresin = token.expiresin;
        if(expire < parseInt(expiresin)) {
          let result = {
            access_token: token.access_token,
            expires_in: expiresin,
            fetchTime: now
          };
          return next(null, result);
        }else {
          return next();
        }
      }else {
        return next();
      }
    })
    .then((next, result) => {
      if(result) {
        return next(null, result);
      }
      var posturl = url.getProviderTokenURL;
      var postdata = {
        "corpid": corpid,
        "provider_secret": providerSecret
      };
      request.post({
        url: posturl,
        body: JSON.stringify(postdata),
        headers: {
          'content-type': 'application/json'
        }
      },
      (err, resp, body) => {
        var bodyError;
        if(!body || body.errcode) {
          bodyError = body;
        }
        if(body.access_token) {
          body.fetchTime = + new Date();
          self.token = body;
        }
        return next(err || bodyError, body);
      });
    })
    .fail((next, err) => {
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
  getLoginInfo: (authcode) => {
    var self = authAPI;
    return Thenjs((next) => {
      getProviderToken(next);
    })
    .then((next, token) => {
      var posturl = url.getLoginInfoURL(token);
      var postdata = {
        "auth_code": authcode
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  }
};

export default authAPI;
