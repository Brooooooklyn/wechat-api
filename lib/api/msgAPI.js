'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _datatypeUrl = require('../datatype/url');

var _datatypeUrl2 = _interopRequireDefault(_datatypeUrl);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _thenjs = require('thenjs');

var _thenjs2 = _interopRequireDefault(_thenjs);

var _basicAPI = require('./basicAPI');

var _basicAPI2 = _interopRequireDefault(_basicAPI);

var _datatypeUtils = require('../datatype/utils');

var _datatypeUtils2 = _interopRequireDefault(_datatypeUtils);

var postJson = _datatypeUtils2['default'].postJson;

var msgAPI = {
  /**
   * 创建群聊的API
   * @param  string chatid   chatid
   * @param  string name     群聊名称
   * @param  string owner    owner id,企业号通讯录里面设置的id
   * @param  array  userlist 参与群聊的人
   * @return object<Thenjs>  Thenjs对象
   * @example
   * {
   * 	"errcode": "0",
   * 	"errmsg": "ok"
   * }
   */
  createChat: function createChat(chatid, name, owner, userlist) {
    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].createChatURL(token);
      var postdata = {
        chatid: chatid,
        name: name,
        owner: owner,
        userlist: userlist
      };
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      return next(err);
    });
  },

  /**
   * 发送信息的接口
   * @param  string sendToId 对个人发送消息就是微信通讯录里面设置的id,群聊则是groupid
   * @param  string senderId ge
   * @param  string msgType  config.js 中定义的vaild msgtype
   * @param  string chatType config.js 中定义的vaild chattype
   * @param  string content  text类型的消息是消息体，其它类型的消息是media id
   * @return object<Thenjs>
   * @example
   * {
   * 	"errcode": 0,
   * 	"errmsg": "ok"
   * }
   */
  sendMsg: function sendMsg(sendToId, senderId, msgType, chatType, content) {
    var vaildMsgType = _config2['default'].vaildMsgType;
    var vaildChatType = _config2['default'].vaildChatType;
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

    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].chatURL(token);
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      return cont(null, err);
    });
  },

  /**
   * 获取一个会话的详细信息
   * @param  string chatid 单聊或者群聊
   * @return object<Thenjs>
   * @example
   * {
   * 	"errcode": 0,
   *  	"errmsg": "ok",
   *   "chat_info": {
   *   	"chatid": "235364212115767297",
   *    	"name": "企业应用中心",
   *     "owner": "zhangsan",
   *     "userlist": ["zhangsan", "lisi", "wangwu"]
   *    }
   * }
   */
  getChat: function getChat(chatid) {
    var getChatUrl;
    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      _request2['default'].get({
        url: _datatypeUrl2['default'].getChatURL(token, chatid),
        json: true
      }, function (err, resp, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      return next(null, err);
    });
  },
  /**
   * 修改话题
   * @param  object postdata
   * {
   * 	"chatid": "235364212115767297",
   *   "op_user": "lisi",
   *   "name": "企业应用中心", 非必需
   *   "owner": "zhangsan",  非必需
   *   "add_user_list": ["zhaoli"], 非必需
   *   "del_user_list": ["zhangsan"] 非必需
   * }
   * @return object<Thenjs>
   * @example
   * {
   * 	"errcode": 0,
   * 	"errmsg": "ok"
   * }
   */
  modifyChat: function modifyChat(postdata) {
    if (!postdata.chatid) {
      throw 'chat id is not defined, please check the postdata in modifyChat';
      return;
    }
    if (!postdata.op_user) {
      throw 'op_user is not defined, please check the postdata in modifyChat';
      return;
    }
    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].updateChatURL(token);
      _datatypeUtils2['default'].postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, err);
    });
  },

  /**
   * 退出话题
   * @param  string chatid 群聊的chat id
   * @param  string userid 企业通讯录里面定义的user id，必需在要退出的群聊中
   * @return object<Thenjs>
   * @example
   * {
   * 	"errcode": 0,
   * 	"errmsg": "ok"
   * }
   */
  quitChat: function quitChat(chatid, userid) {
    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].quitChatURL(token);
      var postdata = {
        chatid: chatid,
        op_user: userid
      };
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, err);
    });
  },

  /**
   * 清除消息标记
   * @param  string userid 操作者，需要清除标记的用户
   * @param  string type   single / group
   * @param  string id     企业通讯录中定义的user id / 群聊 group id,与操作者对话的人或者操作者所在的群聊
   * @return object<Thenjs>
   * @example
   * {
   * 	"errcode": 0,
   * 	"errmsg": "ok"
   * }
   */
  clearNotify: function clearNotify(userid, type, id) {
    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].clearChatURL(token);
      var postdata = {
        op_user: userid,
        chat: {
          type: type,
          id: id
        }
      };
      postJson(posturl, postdata, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, next);
    });
  },

  /**
   * 设置新消息免打扰
   * @param  object userlist
   * {
   * 	'user_mute_list': [
   * 		{
   * 			userid: 'yinan',
   * 			status: 0
   * 		},
   * 		{
   * 			userid: 'huaqiao',
   * 			status: 1
   * 		}
   * 	]
   * }
   * 默认值为0, 0是关闭,1是打开
   * @return object<Thenjs>
   * @example
   * {
   * 	"errcode": 0,
   * 	"errmsg": "ok",
   * 	"invaliduser":["asdfjjj"]
   * }
   */
  muteChat: function muteChat(userlist) {
    return (0, _thenjs2['default'])(function (next) {
      getAccessToken(next);
    }).then(function (next, token) {
      var posturl = _datatypeUrl2['default'].muteChatURL(token);
      postJson(posturl, userlist, function (err, body) {
        getResponse(err, body, next);
      });
    }).fail(function (next, err) {
      next(null, err);
    });
  }

};

function getAccessToken(next) {
  _basicAPI2['default'].getAccessToken().then(function (next2, resp) {
    var token = resp.access_token;
    return next(null, token);
  });
}

function getResponse(err, body, next) {
  var bodyError;
  if (!body || body.errcode) {
    bodyError = body;
  }
  return next(bodyError || err, body);
}

exports['default'] = msgAPI;
module.exports = exports['default'];