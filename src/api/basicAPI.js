import url from '../datatype/url'
import config from 'config';
import request from 'request';
import Thenjs from 'thenjs';

var basicAPI = {
  /**
   * 获取access_token方法
   * @return object<Thenjs> Thenjs 对象
   */
   getAccessToken: () => {
     var corpid = config.ENTERPRISE_WECHAT.corpid;
     var secret = config.ENTERPRISE_WECHAT.secret;
     var qs = `corpid=${corpid}&corpsecret=${secret}`;
     var tokenURL = url.tokenURL(qs);
     var self = basicAPI;
     return Thenjs((next) => {
       let now = + new Date();
       let token = self.token;
       if(token) {
         let expire = now - token.fetchTime;
         let result = {
           access_token: token.access_token,
           expires_in: expire,
           fetchTime: now
         }
         return next(null, result);
       }
       request.get({
         url: tokenURL,
         json: true
       },
       (err, resp, body) => {
         var bodyError;
         if (!body || body.errcode) {
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
       return next(err);
     });
   }
}

export default basicAPI;
