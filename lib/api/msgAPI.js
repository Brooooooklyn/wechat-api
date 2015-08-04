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

var msgAPI = {
  /**
   * 创建群聊的API
   * @param  string chatid   chatid
   * @param  string name     群聊名称
   * @param  string owner    owner id,企业号通讯录里面设置的id
   * @param  array  userlist 参与群聊的人
   * @return object<Thenjs>  Thenjs对象
   */
  createChat: function createChat(chatid, name, owner, userlist) {
    var createUrl;
    return (0, _thenjs2['default'])(function (next) {
      _basicAPI2['default'].getAccessToken().then(function (next2, body) {
        var token = body.access_token;
        createUrl = _datatypeUrl2['default'].createChatURL(token);
        return next();
      });
    }).then(function (next) {
      _request2['default'].post({
        headers: {
          'content-type': 'application/json'
        },
        url: createUrl,
        body: JSON.stringify({
          chatid: chatid,
          name: name,
          owner: owner,
          userlist: userlist
        })
      }, function (err, resp, body) {
        var bodyError;
        if (!body || body.errcode) {
          bodyError = body;
        }
        return next(bodyError || err, body);
      });
    }).fail(function (next, err) {
      return next(err);
    });
  },

  /**
   * 发送信息的接口
   * @param  string sendToId 对个人发送消息就是微信通讯录里面设置的id,群聊则是groupid
   * @param  string senderId ge
   * @param  string msgType  default.json 中定义的vaild msgtype
   * @param  string chatType defautl.json 中定义的vaild chattype
   * @param  string content  text类型的消息是消息体，其它类型的消息是media id
   * @return object<Thenjs>          Thenjs对象
   */
  sendMsg: function sendMsg(sendToId, senderId, msgType, chatType, content) {
    var vaildMsgType = _config2['default'].ENTERPRISE_WECHAT.vaildMsgType;
    var vaildChatType = _config2['default'].ENTERPRISE_WECHAT.vaildChatType;
    if (vaildMsgType.indexOf(msgType) === -1) {
      throw 'invaild msg type in msgAPI -> send message, please check the arguments';
      return;
    }
    if (vaildChatType.indexOf(chatType) === -1) {
      throw 'invaild chatType in msgAPI -> send message, please check the arguments';
    }
    var postdata = {
      receiver: {
        type: chatType,
        id: sendToId
      },
      sender: senderId,
      msgtype: msgType
    };
    if (msgType === 'text') {
      postdata[msgType] = {
        content: content
      };
    } else {
      postdata[msgType] = {
        media_id: content
      };
    }

    var chatURL;

    return (0, _thenjs2['default'])(function (next) {
      _basicAPI2['default'].getAccessToken().then(function (next2, body) {
        var token = body.access_token;
        chatURL = _datatypeUrl2['default'].chatURL(token);
        return next();
      });
    }).then(function (next) {
      _request2['default'].post({
        headers: {
          'content-type': 'application/json'
        },
        url: chatURL,
        body: JSON.stringify(postdata)
      }, function (err, resp, body) {
        var bodyError;
        if (!body || body.errcode) {
          bodyError = body;
        }
        return next(bodyError || err, body);
      });
    }).fail(function (next, err) {
      return cont(null, err);
    });
  },

  getChat: function getChat(chatid) {
    var getChatUrl;
    return (0, _thenjs2['default'])(function (next) {
      _basicAPI2['default'].getAccessToken().then(function (next2, resp) {
        var token = resp.access_token;
        getChatUrl = _datatypeUrl2['default'].getChatURL(token, chatid);
        return next();
      });
    }).then(function (next) {
      _request2['default'].get({
        url: getChatUrl,
        json: true
      }, function (err, resp, body) {
        var bodyError;
        if (!body || body.errcode) {
          bodyError = body;
        }
        return next(err || bodyError, body);
      });
    }).fail(function (next, err) {
      return next(null, err);
    });
  }

};

exports['default'] = msgAPI;
module.exports = exports['default'];