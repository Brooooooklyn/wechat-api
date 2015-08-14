import config from 'config';
import ErrorCode from '../crypt/errorcode';
import WxCrypt from '../crypt/WxCrypt';
import xml from 'xml2js';
import Thenjs from 'thenjs';

var token = config.ENTERPRISE_WECHAT.token;
var encodingAesKey = config.ENTERPRISE_WECHAT.EncodingAESKey;
var corpid = config.ENTERPRISE_WECHAT.corpid;

var crypt = new WxCrypt(corpid, token, encodingAesKey);
var xmlBuilder = new xml.Builder();
var parser = new xml.Parser();
var parseString = (xml) => {
  return Thenjs((next) => {
    parser.parseString(xml, (err, result) => {
      if(err) {
        return next(err);
      }
      return next(null, result);
    });
  })
  .fail((next, err) => {
    return next(null, err);
  });
};

var prepareMessage = (message) => {
  var xml = message.xml;
  xml.AgentType = xml.AgentType[0];
  xml.PackageId = xml.PackageId[0];
  xml.ToUserName = xml.ToUserName[0];
  xml.ItemCount = xml.ItemCount[0];
  var items = xml.Item;
  var parsedItems = [];
  var item;
  var Receiver = {
    'Type': '',
    'Id': ''
  };
  for (let i = 0; i < items.length; i++) {
    item = items[i];
    item.FromUserName = item.FromUserName[0];
    item.CreateTime = item.CreateTime[0];
    item.Content = item.Content ? item.Content[0] : '';
    item.MsgId = item.MsgId ? item.MsgId[0] : '';
    item.MsgType = item.MsgType[0];
    item.ChatId = item.ChatId ? item.ChatId[0] : '';
    Receiver.Type = item.Receiver ? item.Receiver[0].Type[0] : '';
    Receiver.Id = item.Receiver ? item.Receiver[0].Id[0] : '';
    item.Receiver = Receiver;
    parsedItems.push(item);
  }
  xml.Item = parsedItems;
  return message;
};

var prepareSuiteMsg = (message) => {
  var xml = message.xml;
  var result = {
    "SuiteId": xml.SuiteId ? xml.SuiteId[0] : '',
    "SuiteTicket": xml.SuiteTicket ? xml.SuiteTicket[0] : '',
    "AuthCorpId": xml.AuthCorpId ? xml.AuthCorpId[0]: '',
    "InfoType": xml.InfoType ? xml.InfoType[0] : '',
    "TimeStamp": xml.TimeStamp ? xml.TimeStamp[0] : ''
  };
  return result;
};

var handlerResult = (result, next) => {
  if(!result.xml || !result.xml.Encrypt || !result.xml.ToUserName) {
    return next(ErrorCode('ParseXmlError'));
  }
  var encrypt = result.xml.Encrypt[0];
  next(null, encrypt);
};

var handlerAPI = {
 /**
  * 验证URL
  * @param  string msgSignature 签名串,对应URL参数的msg_signature
  * @param  string timestamp    时间戳,对应URL参数的timestamp
  * @param  string nonce        随机串,对应URL参数的nonce
  * @param  string echostr      解密后的echostr
  * @return array               ret: errercode, reply echo str
  */
  verifyURL: (msgSignature, timestamp, nonce, echostr) => {
    var result = crypt.getSHA1(timestamp, nonce, echostr);
    var ret = result[0];

    if(ret !== 0) {
      return ret;
    }

    var signature = result[1];
    if(signature !== msgSignature) {
      return ErrorCode('ValidateSignatureError');
    }

    var decrypted = crypt.decrypt(echostr);

    var replyEchoStr = decrypted.message;
    return [
      ErrorCode('OK'),
      replyEchoStr
    ];
  },


 /**
  * 将公众平台回复给用户的消息加密打包
  * <ol>
  *    <li>对要发送的消息进行AES-CBC加密</li>
  *    <li>生成安全签名</li>
  *    <li>将消息密文和安全签名打包成xml格式</li>
  * </ol>
  * @param  string replyMsg  需要回复的消息
  * @param  string timestamp 时间戳
  * @param  string nonce     随机字符串
  * @return array            ret: status code, xml content
  */
  encryptMsg: (replyMsg, timestamp, nonce) => {
    var result = crypt.encrypt(replyMsg, corpid);
    var ret = result[0];

    if(ret !== 0) {
      return ret;
    }
    if(!timestamp) {
      timestamp = + new Date();
    }
    var encrypt = result[1];

    var sha1 = crypt.getSHA1(timestamp, nonce, encrypt);
    ret = sha1[0];
    if(ret !== 0) {
      return ret;
    }
    signature = sha1[1];

    var xmlContent = {
      'Encrypt': encrypt,
      'MsgSignature': signature,
      'TimeStamp': timestamp,
      'Nonce': nonce
    };
    var xmlResult = xmlBuilder.buildObject(xmlContent);
    return [
      ErrorCode['OK'],
      xmlResult
    ];

  },

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
  * @param  string type         default message, 指定要解析的xml类型
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
  decryptMsg: (msgSignature, timestamp, nonce, postdata, type = 'message') => {
    if(!postdata) {
      throw 'Illegal postdata in decryptMsg';
    }
    if(!timestamp) {
      timestamp = + new Date()
    }
    return Thenjs((next) => {
      parseString(postdata)
      .then((next2, result) => {
        handlerResult(result, next2);
      })
      .then((next2, encrypt) => {
        var sha1 = crypt.getSHA1(timestamp, nonce, encrypt);
        var ret = sha1[0];
        if(ret) {
          return next(ret);
        }
        var signature = sha1[1];
        if(signature !== msgSignature) {
          return next(ErrorCode('ValidateSignatureError'));
        }
        var result = crypt.decrypt(encrypt);
        var msg = result.message;
        return next(null, msg);
      });
    })
    .then((next, msg) => {
      parseString(msg)
      .then((next2, result) => {
        if(type === 'message') {
          let message = prepareMessage(result);
          return next(null, [ErrorCode('OK'), message]);
        } else {
          let message = prepareSuiteMsg(result);
          return next(null, message);
        }
      });
    })
    .fail((next, err) => {
      next(null, err);
    });
  }


};

export default handlerAPI;
