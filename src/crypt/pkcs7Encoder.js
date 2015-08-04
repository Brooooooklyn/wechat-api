const blocksize = 32;

class PKCS7Encoder {

 /**
  * 对需要加密的明文进行填充补位
  * @param  string text 需要进行填充补位的明文
  * @return string      补齐明文字符串
  */
  encode(text) {
    var textlength = text.length;
    //计算需要填充的位数
    var amountToPad = blocksize - (textlength % blocksize);
    if(amountToPad === 0) {
      amountToPad = blocksize;
    }
    var result = new Buffer(amountToPad);
    result.fill(amountToPad);

    return Buffer.concat([text, result]);
  }

 /**
  * 对解密后的明文进行补位删除
  * @param  string text 解密后的明文
  * @return string      删除补位后的明文
  */
  decode(text) {
    var pad = text[text.length - 1];
    if(pad < 1 || pad > blocksize) {
      pad = 0;
    }
    return text.slice(0, text.length - pad);
  }
}

export default new PKCS7Encoder();
