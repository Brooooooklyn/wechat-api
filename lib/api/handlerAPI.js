'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _cryptErrorcode = require('../crypt/errorcode');

var _cryptErrorcode2 = _interopRequireDefault(_cryptErrorcode);

var _cryptWxCrypt = require('../crypt/WxCrypt');

var _cryptWxCrypt2 = _interopRequireDefault(_cryptWxCrypt);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _thenjs = require('thenjs');

var _thenjs2 = _interopRequireDefault(_thenjs);

var token = _config2['default'].ENTERPRISE_WECHAT.token;
var encodingAesKey = _config2['default'].ENTERPRISE_WECHAT.EncodingAESKey;
var corpid = _config2['default'].ENTERPRISE_WECHAT.corpid;

var crypt = new _cryptWxCrypt2['default'](corpid, token, encodingAesKey);
var xmlBuilder = new _xml2js2['default'].Builder();
var parseString = function parseString(xml) {
  return (0, _thenjs2['default'])(function (next) {
    xml.parseString(xml, function (err, result) {
      if (err) {
        return next('err', err);
      }
      return next(null, result);
    });
  }).fail(function (err, next) {
    return next(null, err);
  });
};

var handlerResult = function handlerResult(result, next) {
  if (!result.xml || !result.xml.Encrypt || !result.xml.ToUserName) {
    return next((0, _cryptErrorcode2['default'])('ParseXmlError'));
  }
  var encrypt = result.xml.encrypt;
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
  verifyURL: function verifyURL(msgSignature, timestamp, nonce, echostr) {
    var result = crypt.getSHA1(timestamp, nonce, echostr);
    var ret = result[0];

    if (ret !== 0) {
      return ret;
    }

    var signature = result[1];
    if (signature !== msgSignature) {
      return (0, _cryptErrorcode2['default'])('ValidateSignatureError');
    }

    var decrypted = crypt.decrypt(echostr);

    var replyEchoStr = decrypted.message;
    return [(0, _cryptErrorcode2['default'])('OK'), replyEchoStr];
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
  encryptMsg: function encryptMsg(replyMsg, timestamp, nonce) {
    var result = crypt.encrypt(replyMsg, corpid);
    var ret = result[0];

    if (ret !== 0) {
      return ret;
    }
    if (!timestamp) {
      timestamp = +new Date();
    }
    var encrypt = result[1];

    var sha1 = crypt.getSHA1(token, timestamp, nonce, encrypt);
    ret = sha1[0];
    if (ret !== 0) {
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
    return [_cryptErrorcode2['default']['OK'], xmlResult];
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
   * @return object<Thenjs>
   */
  decryptMsg: function decryptMsg(msgSignature, timestamp, nonce, postdata) {
    if (timestamp === undefined) timestamp = null;

    if (!postdata) {
      throw 'Illegal postdata in decryptMsg';
    }
    if (!timestamp) {
      timestamp = +new Date();
    }
    return (0, _thenjs2['default'])(function (next) {
      parseString(postdata).then(function (next2, result) {
        handlerResult(result, next2);
      }).then(function (next2, encrypt) {
        var sha1 = crypt.getSHA1(token, timestamp, nonce, encrypt);
        var ret = sha1[0];
        if (ret) {
          return cont(ret);
        }
        var signature = sha1[1];
        if (signature !== msgSignature) {
          return next((0, _cryptErrorcode2['default'])('ValidateSignatureError'));
        }
        var result = crypt.decrypt(encrypt, corpid);
        ret = result[0];
        if (ret) {
          return next(ret);
        }
        var msg = result[1];
        return next([(0, _cryptErrorcode2['default'])('OK'), msg]);
      });
    }).fail(function (err, next) {
      next(null, err);
    });
  }

};

exports['default'] = handlerAPI;
module.exports = exports['default'];