import url from '../datatype/url'
import config from '../config';
import request from 'request';
import Thenjs from 'thenjs';
import basicAPI from './basicAPI';
import utils from '../datatype/utils'


var postJson = utils.postJson;

var msgAPI = {
 /**
  * 创建群聊的API
  * @param  string chatid   chatid
  * @param  string name     群聊名称
  * @param  string owner    owner id,企业号通讯录里面设置的id
  * @param  array  userlist 参与群聊的人
  * @return object<Thenjs>  Thenjs对象
  */
  createChat: (chatid, name, owner, userlist) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.createChatURL(token);
      var postdata = {
        chatid: chatid,
        name: name,
        owner: owner,
        userlist: userlist
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
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
  sendMsg: (sendToId, senderId, msgType, chatType, content) => {
    var vaildMsgType = config.vaildMsgType;
    var vaildChatType = config.vaildChatType;
    if(vaildMsgType.indexOf(msgType) === -1) {
      throw 'invaild msg type in msgAPI -> send message, please check the arguments';
      return;
    }
    if(vaildChatType.indexOf(chatType) === -1) {
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
    if(msgType === 'text') {
      postdata[msgType] = {
        content: content
      };
    }else {
      postdata[msgType] = {
        media_id: content
      };
    }

    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.chatURL(token);
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body ,next);
      });
    })
    .fail((next, err) => {
      return cont(null, err);
    });
  },

  getChat: (chatid) => {
    var getChatUrl;
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      request.get({
        url: url.getChatURL(token, chatid),
        json: true
      },
      (err, resp, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      return next(null, err);
    });
  },
 /**
  * 修改话题
  * @param  object postdata
  * @example
  * {
  * 	"chatid": "235364212115767297",
  *   "op_user": "lisi",
  *   "name": "企业应用中心", 非必需
  *   "owner": "zhangsan",  非必需
  *   "add_user_list": ["zhaoli"], 非必需
  *   "del_user_list": ["zhangsan"] 非必需
  * }
  * @return object<Thenjs>
  */
  modifyChat: (postdata) => {
    if(!postdata.chatid) {
      throw 'chat id is not defined, please check the postdata in modifyChat';
      return;
    }
    if(!postdata.op_user) {
      throw 'op_user is not defined, please check the postdata in modifyChat';
      return;
    }
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.updateChatURL(token);
      utils.postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  },

 /**
  * 退出话题
  * @param  string chatid 群聊的chat id
  * @param  string userid 企业通讯录里面定义的user id，必需在要退出的群聊中
  * @return object<Thenjs>
  */
  quitChat: (chatid, userid) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.quitChatURL(token);
      var postdata = {
        chatid: chatid,
        op_user: userid
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((err, next) => {
      next(null, err);
    });
  },

 /**
  * 清除消息标记
  * @param  string userid 操作者，需要清除标记的用户
  * @param  string type   single / group
  * @param  string id     企业通讯录中定义的user id / 群聊 group id,与操作者对话的人或者操作者所在的群聊
  * @return object<Thenjs>
  */
  clearNotify: (userid, type, id) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.clearChatURL(token);
      var postdata = {
        op_user: userid,
        chat: {
          type: type,
          id: id
        }
      };
      postJson(posturl, postdata, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((err, next) => {
      next(null, next);
    });
  },

 /**
  * 设置新消息免打扰
  * @param  object userlist
  * @example
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
  */
  muteChat: (userlist) => {
    return Thenjs((next) => {
      getAccessToken(next);
    })
    .then((next, token) => {
      var posturl = url.muteChatURL(token);
      postJson(posturl, userlist, (err, body) => {
        getResponse(err, body, next);
      });
    })
    .fail((err, next) => {
      next(null, err);
    });
  }


};

function getAccessToken(next) {
  basicAPI.getAccessToken()
  .then((next2, resp) => {
    var token = resp.access_token;
    return next(null, token);
  });
}

function getResponse(err, body, next) {
  var bodyError;
  if(!body || body.errcode) {
    bodyError = body;
  }
  return next(bodyError || err, body);
}

export default msgAPI;
