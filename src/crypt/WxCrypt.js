import ErrorCode from './ErrorCode';
import pkcs7Encoder from './pkcs7Encoder';
import crypto from 'crypto';
import xml from 'xml2js';

var parser = new xml.Parser();

/**
 * WxCrypt class
 *
 * 微信企业号加解密接口
 */
class WxCrypt{

 /**
  * 传入企业号后台的token和encodingAESKey
  * @param  string corpid         企业号后台配置的corpid
  * @param  string token          企业号后台配置的token
  * @param  string encodingAESKey 企业号后台配置的encodingAESKey
  * @return void
  */
  constructor(corpid, token, encodingAESKey) {
    if(!corpid || !token || !encodingAESKey) {
      throw('Illegal constructor arguments.');
    }
    if(encodingAESKey.length !== 43) {
      throw('Illegal encodingAESKey length.');
    }
    this.key = new Buffer(encodingAESKey + '=', 'base64');
    this.iv = this.key.slice(0, 16);
    this.token = token;
    this.corpid = corpid;
  }

 /**
  * 对明文进行加密
  * @param  string text   需要加密的明文
  * @return string        base64 string
  */
  encrypt(text) {
    // 算法：AES_Encrypt[random(16B) + msg_len(4B) + msg + $CorpID]
    // 获取16B的随机字符串
    var randomString = crypto.pseudoRandomBytes(16);
    var msg = new Buffer(text);
    // 获取4B的内容长度的网络字节序
    var msgLength = new Buffer(4);
    msgLength.writeUInt32BE(msg.length, 0);

    var corpid = new Buffer(this.corpid);

    var bufMsg = Buffer.concat([randomString, msgLength, msg, corpid]);

    // 对明文进行补位操作
    var encoded = pkcs7Encoder.encode(bufMsg);

    // 创建加密对象，AES采用CBC模式，数据采用PKCS#7填充；IV初始向量大小为16字节，取AESKey前16字节
    var cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    cipher.setAutoPadding(false);

    var cipheredMsg = Buffer.concat([cipher.update(encoded), cipher.final()]);

    // 返回加密数据的base64编码
    return cipheredMsg.toString('base64');
  }

 /**
  * 对密文进行解密
  * @param  string text  需要解密的密文
  * @return object       message和id
  */
  decrypt(text) {
    // 创建解密对象，AES采用CBC模式，数据采用PKCS#7填充；IV初始向量大小为16字节，取AESKey前16字节
    var decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    decipher.setAutoPadding(false);
    var deciphered = Buffer.concat([decipher.update(text, 'base64'), decipher.final()]);

    deciphered = pkcs7Encoder.decode(deciphered);
    // 算法：AES_Encrypt[random(16B) + msg_len(4B) + msg + $CorpID]
    // 去除16位随机数
    var content = deciphered.slice(16);
    var length = content.slice(0, 4).readUInt32BE(0);
    var message = content.slice(4, length + 4).toString();

    return {
      message: message,
      id: content.slice(length + 4).toString()
    };
  }

 /**
  * 用SHA1算法生成安全签名
  * @param  string timestamp 时间戳
  * @param  string nonce     随机字符串
  * @param  string encrypt   密文消息
  * @return array            errorCode + 签名后的字符串
  */
  getSHA1(timestamp, nonce, encrypt) {
    var msgQueue;
    var str;
    var shasum;
    var result;

    var token = this.token;

    if(!token || !timestamp || !nonce || !encrypt) {
      throw 'Illegal params in getSHA1, please check';
      return [ErrorCode('ComputeSignatureError')];
    }

    shasum = crypto.createHash('sha1');

    msgQueue = [
      encrypt,
      token,
      timestamp,
      nonce
    ].sort();

    str = msgQueue.join('');
    result = shasum.update(str).digest('hex');
    return [
      ErrorCode('OK'),
      result
    ];
  }
}

export default WxCrypt;
