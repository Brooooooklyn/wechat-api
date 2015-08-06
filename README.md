##微信企业号消息 Node SDK

### 项目启动
测试可能需要全局安装`mocha`
```
sudo npm install mocha -g
```
build可能需要全局安装`babel`

```
sudo npm install babel -g
```
###开发中可使用的命令：
```
npm run build
npm run test
npm run watch
```

##用法

在项目中引入：
```
npm i wechat-enterprise-sdk --save
npm i config --save
```
然后在项目目录下建立config 目录并且在里面加入default.json
在default.json中加入

```
{
  "ENTERPRISE_WECHAT": {
    "corpid": "your corp id",
    "secret": "your corp secret",
    "token": "your token",
    "EncodingAESKey": "your EncodingAESKey"
  }
}

```


##API

```
var wechat = require('wechat-enterprise-sdk');

```

### msgAPI
主动发送消息API
```
var msgAPI = wechat.msgAPI;
```
####msgAPI.createChat
创建群聊方法
```
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
msgAPI.createChat(chatid, name, owner, userlist)
.then((next, result) => {
	//result from wechat server @example
});

```

####msgAPI.sendMsg
发送消息，单聊或群聊

```
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
  msgAPI.sendMsg(sendToId, senderId, msgType, chatType, content)
  .then((next, result) => {
    //result from wechat server @example
  });
```

####msgAPI.getChat
获取一个会话的详细信息

```
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
  msgAPI.getChat(11211)
  .then((next, result) => {
    //result from wechat server @example
  });
```

####msgAPI.modifyChat
修改会话信息

```
/**
  * 修改话题
  * @param  object postdata
  * {
  *   "chatid": "235364212115767297",
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
  msgAPI.modifyChat(postdata)
  .then((next, result) => {
    //result from wechat server @example
  });
```

####msgAPI.quitChat
退出话题

```
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
  msgAPI.quitChat(chatid, userid)
  .then((next, result) => {
	//result from wechat server @example
  });
```

####msgAPI.clearNotify
清除消息未读标记
```
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
  msgAPI.clearNotify(userid, type, id)
  .then((next, result) => {
	//result from wechat server @example
  });
```

####msgAPI.muteChat
设置成员新消息勿打扰

```
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
  msgAPI.muteChat(userlist)
  .then((next, result) => {
	//result from wechat server @example
	//这里如果全部是不合法的userid, 返回的数据结构和example有差别:
	//{"errcode":40031,"errmsg":"invalid userid list"}
  });
```

###handlerAPI
被动响应微信消息API
```
var handlerAPI = wechat.handlerAPI;
```

####handlerAPI.verifyURL
在设置微信消息回调的时候，对设置的URL进行验证时需要用到的方法

```
/**
  * 验证URL
  * @param  string msgSignature 签名串,对应URL参数的msg_signature
  * @param  string timestamp    时间戳,对应URL参数的timestamp
  * @param  string nonce        随机串,对应URL参数的nonce
  * @param  string echostr      解密后的echostr
  * @return array               ret: errercode, reply echo str
  */
  var result = handlerAPI.verifyURL(msgSignature, timestamp, nonce, echostr);
  expect(result[0]).to.equal(0);
  //result[1]的指既为解密后的原始值，直接响应给微信即可通过验证
```

####handlerAPI.decryptMsg
设置微信消息回调链接成功后，所有的用户发给企业通讯录其他用户或者群聊中的消息都会发送给设置的回调的链接，此方法是对这些消息进行解密。

```
/**
  * 检验消息的真实性，并且获取解密后的明文
  * <ol>
  *    <li>利用收到的密文生成安全签名，进行签名验证</li>
  *    <li>若验证通过，则提取xml中的加密消息</li>
  *    <li>对消息进行解密</li>
  * </ol>
  * @param  string msgSignature get 到的消息签名
  * @param  string timestamp    默认为null,时间戳
  * @param  string nonce        随机字符串
  * @param  string postdata     post 的 xml
  * @return object<Thenjs>
  * @example
  * [
  * 	0,
  * 	{
  * 		"xml": {
  * 			"AgentType":"chat",
  * 			"ToUserName":"wx80850b023d7c38d9",
  * 			"ItemCount":"1",
  * 			"PackageId":"429496798487285866",
  * 			"Item": [
  * 				{
  * 					"FromUserName":"yinan",
  * 					"CreateTime":"1438850706",
  * 					"MsgType":"text",
  * 					"Content":"哈哈哈",
  * 					"MsgId":"6179816726305163297",
  * 					"Receiver": {
  * 						"Type":"single",
  * 						"Id":"huaqiao"
  * 					}
  * 				}
  * 			]
  * 		}
  * 	}
  * ]
  */
  handlerAPI.decryptMsg(msgSignature, timestamp = null, nonce, postdata)
  .then((next, result) => {
	// xml parsed result @example
	expect(result[0]).to.equal(0);
  });
```
